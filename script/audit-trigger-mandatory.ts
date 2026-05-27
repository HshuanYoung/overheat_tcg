import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import XLSX from 'xlsx';

type WorkbookRow = Record<string, unknown>;

type MergedCardRow = {
  CardID: string;
  CardName: string;
  CardNo: string;
  CardDetail: string;
  detailSourceIndex: number;
};

type RawTrigger = {
  index: number;
  text: string;
  hasCan: boolean;
  expectedMandatory?: boolean;
  reviewReason?: string;
};

type TriggerEffectInfo = {
  index: number;
  id: string;
  isMandatory?: boolean;
};

type AuditEntry = {
  cardId: string;
  cardName: string;
  cardNo: string;
  scriptPath?: string;
  effectId?: string;
  rawText?: string;
  expected?: 'mandatory' | 'optional';
  actual?: 'mandatory' | 'optional' | 'missing';
  reason?: string;
};

type AutoFixEntry = Required<Pick<AuditEntry, 'cardId' | 'cardName' | 'cardNo' | 'scriptPath' | 'effectId' | 'rawText' | 'expected' | 'actual'>> & {
  newValue: 'mandatory' | 'optional';
};

type Report = {
  generatedAt: string;
  fix: boolean;
  summary: {
    cardsWithTriggerText: number;
    autoFixCandidates: number;
    autoFixed: number;
    needsReview: number;
    missingImplementation: number;
    importErrors: number;
  };
  autoFixCandidates: AutoFixEntry[];
  autoFixed: AutoFixEntry[];
  needsReview: AuditEntry[];
  missingImplementation: AuditEntry[];
  importErrors: AuditEntry[];
};

type Options = {
  fix: boolean;
  cardPath: string;
  card2Path: string;
  scriptsDir: string;
  reportPath: string;
};

const TRIGGER_MARKS = ['【诱】', '【誘】'];
const ABILITY_MARKS = ['【诱】', '【誘】', '【启】', '【啟】', '【永】', '【反击】', '【反擊】'];

function parseArgs(argv: string[]): Options {
  const repoRoot = process.cwd();
  const options: Options = {
    fix: false,
    cardPath: path.resolve(repoRoot, 'Card.xlsx'),
    card2Path: path.resolve(repoRoot, 'Card2.xlsx'),
    scriptsDir: path.resolve(repoRoot, 'src', 'scripts'),
    reportPath: path.resolve(repoRoot, 'reports', 'trigger-mandatory-audit.json')
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];
    switch (current) {
      case '--fix':
        options.fix = true;
        break;
      case '--card':
        options.cardPath = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--card2':
        options.card2Path = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--scripts':
        options.scriptsDir = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--report':
        options.reportPath = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--help':
        printHelp();
        process.exit(0);
      default:
        throw new Error(`Unknown argument: ${current}`);
    }
  }

  return options;
}

function requireValue(flag: string, value: string | undefined) {
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

function printHelp() {
  console.log([
    'Usage: tsx script/audit-trigger-mandatory.ts [options]',
    '',
    'Options:',
    '  --fix              Apply safe isMandatory fixes',
    '  --card <path>      Card.xlsx path (default: ./Card.xlsx)',
    '  --card2 <path>     Card2.xlsx path (default: ./Card2.xlsx)',
    '  --scripts <dir>    Scripts directory (default: ./src/scripts)',
    '  --report <path>    JSON report path (default: ./reports/trigger-mandatory-audit.json)',
    '  --help             Show this help'
  ].join('\n'));
}

function normalizeText(value: unknown) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function normalizeNameKey(value: string) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[【】「」『』\[\]（）()]/g, '')
    .replace(/[·・•？！。"“”‘’~!@#$%^&*_=+|\\/,:;?.<>\-\s]/g, '');
}

function readWorkbookRows(filePath: string): WorkbookRow[] {
  if (!fs.existsSync(filePath)) throw new Error(`Excel file not found: ${filePath}`);
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const firstSheet = workbook.SheetNames[0];
  if (!firstSheet) throw new Error(`Excel file has no readable sheet: ${filePath}`);
  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: '' }) as WorkbookRow[];
}

function buildIdLookup(cardRows: WorkbookRow[]) {
  const exact = new Map<string, string>();
  const normalized = new Map<string, string[]>();

  for (const row of cardRows) {
    const cardName = normalizeText(row.CardName);
    const cardId = normalizeText(row.CardID);
    if (!cardName || !cardId) continue;
    exact.set(cardName, cardId);
    const key = normalizeNameKey(cardName);
    normalized.set(key, [...(normalized.get(key) || []), cardId]);
  }

  const lookup = new Map<string, string>(exact);
  for (const [key, ids] of normalized) {
    if (ids.length === 1 && !lookup.has(key)) lookup.set(key, ids[0]);
  }
  return lookup;
}

function mergeRows(cardRows: WorkbookRow[], detailRows: WorkbookRow[]): MergedCardRow[] {
  const idLookup = buildIdLookup(cardRows);
  return detailRows.map((row, index) => {
    const cardName = normalizeText(row.CardName);
    const cardId = idLookup.get(cardName) || idLookup.get(normalizeNameKey(cardName)) || '';
    return {
      CardID: cardId,
      CardName: cardName,
      CardNo: normalizeText(row.CardNo),
      CardDetail: normalizeText(row.CardDetail),
      detailSourceIndex: index + 2
    };
  });
}

function markerIndex(line: string, markers: string[]) {
  const indexes = markers
    .map(marker => line.indexOf(marker))
    .filter(index => index >= 0);
  return indexes.length ? Math.min(...indexes) : -1;
}

function hasTopLevelPrefix(prefix: string) {
  const stripped = prefix
    .replace(/【[^】]*】/g, '')
    .replace(/〖[^〗]*〗/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/[0-9０-９A-Za-z+＋\-－~～:：,，、\s]/g, '');
  return stripped.length === 0;
}

function isTopLevelTriggerLine(line: string) {
  const trimmed = line.trim();
  const index = markerIndex(trimmed, TRIGGER_MARKS);
  return index >= 0 && hasTopLevelPrefix(trimmed.slice(0, index));
}

function isTopLevelAbilityLine(line: string) {
  const trimmed = line.trim();
  const directIndex = markerIndex(trimmed, ABILITY_MARKS);
  if (directIndex >= 0 && hasTopLevelPrefix(trimmed.slice(0, directIndex))) return true;
  return /^【[^】]*】/.test(trimmed) && !trimmed.includes('获得“') && !trimmed.includes('获得"');
}

function classifyCanText(text: string) {
  if (!text.includes('可以')) return { expectedMandatory: true };
  if (/对手可以|玩家可以|所有玩家可以|各玩家可以|被选择[^。]*可以|那名玩家可以/.test(text)) {
    return { reviewReason: 'contains 可以 for a non-controller choice' };
  }
  if (/获得[^。]*可以|得到[^。]*可以|视为[^。]*可以|“[^”]*可以[^”]*”|"[^"]*可以[^"]*"/.test(text)) {
    return { reviewReason: 'contains 可以 inside granted/quoted text' };
  }
  return { expectedMandatory: false };
}

function extractRawTriggers(cardDetail: string): RawTrigger[] {
  const lines = normalizeText(cardDetail)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
  const triggers: RawTrigger[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!isTopLevelTriggerLine(line)) continue;

    const parts = [line];
    let next = index + 1;
    while (next < lines.length && !isTopLevelAbilityLine(lines[next])) {
      parts.push(lines[next]);
      next += 1;
    }

    const text = parts.join('\n');
    const classification = classifyCanText(text);
    triggers.push({
      index: triggers.length + 1,
      text,
      hasCan: text.includes('可以'),
      expectedMandatory: classification.expectedMandatory,
      reviewReason: classification.reviewReason
    });
  }

  return triggers;
}

async function loadCard(scriptPath: string) {
  return (await import(`${pathToFileURL(scriptPath).href}?audit=${Date.now()}_${Math.random()}`)).default;
}

function triggerEffectsOf(card: any): TriggerEffectInfo[] {
  return (card?.effects || [])
    .filter((effect: any) => effect?.type === 'TRIGGER')
    .map((effect: any, index: number) => ({
      index: index + 1,
      id: String(effect.id || `trigger_${index + 1}`),
      isMandatory: effect.isMandatory
    }));
}

function stateLabel(value: boolean | undefined): 'mandatory' | 'optional' | 'missing' {
  if (value === true) return 'mandatory';
  if (value === false) return 'optional';
  return 'missing';
}

function findLastOpenBraceBefore(text: string, targetIndex: number) {
  let quote: string | null = null;
  let escaping = false;
  let lineComment = false;
  let blockComment = false;
  let lastOpen = -1;

  for (let index = 0; index < targetIndex; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaping) {
        escaping = false;
      } else if (char === '\\') {
        escaping = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') lastOpen = index;
  }

  return lastOpen;
}

function findMatchingBrace(text: string, startIndex: number) {
  let quote: string | null = null;
  let escaping = false;
  let lineComment = false;
  let blockComment = false;
  let depth = 0;

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaping) {
        escaping = false;
      } else if (char === '\\') {
        escaping = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '\'' || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function findEffectBlock(text: string, effectId: string) {
  const idMatch = new RegExp(`id:\\s*['"]${escapeRegExp(effectId)}['"]`).exec(text);
  if (!idMatch) return undefined;
  const start = findLastOpenBraceBefore(text, idMatch.index);
  if (start < 0) return undefined;
  const end = findMatchingBrace(text, start);
  if (end < 0) return undefined;
  return { start, end: end + 1, text: text.slice(start, end + 1) };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyMandatoryFix(scriptPath: string, effectId: string, expectedMandatory: boolean) {
  const source = fs.readFileSync(scriptPath, 'utf8');
  const block = findEffectBlock(source, effectId);
  if (!block) throw new Error(`Cannot locate effect block ${effectId} in ${scriptPath}`);

  const replacementValue = expectedMandatory ? 'true' : 'false';
  const existingMatch = /isMandatory:\s*(true|false)/.exec(block.text);
  let newBlock: string;
  if (existingMatch) {
    newBlock = block.text.replace(/isMandatory:\s*(true|false)/, `isMandatory: ${replacementValue}`);
  } else {
    const typeMatch = /^(\s*)type:\s*['"]TRIGGER['"],?/m.exec(block.text);
    if (!typeMatch) throw new Error(`Cannot find TRIGGER type in ${effectId}`);
    const insertAt = typeMatch.index + typeMatch[0].length;
    const comma = typeMatch[0].endsWith(',') ? '' : ',';
    newBlock = `${block.text.slice(0, insertAt)}${comma}\n${typeMatch[1]}isMandatory: ${replacementValue},${block.text.slice(insertAt)}`;
  }

  fs.writeFileSync(scriptPath, `${source.slice(0, block.start)}${newBlock}${source.slice(block.end)}`, 'utf8');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const cardRows = readWorkbookRows(options.cardPath);
  const detailRows = readWorkbookRows(options.card2Path);
  const mergedRows = mergeRows(cardRows, detailRows);

  const report: Report = {
    generatedAt: new Date().toISOString(),
    fix: options.fix,
    summary: {
      cardsWithTriggerText: 0,
      autoFixCandidates: 0,
      autoFixed: 0,
      needsReview: 0,
      missingImplementation: 0,
      importErrors: 0
    },
    autoFixCandidates: [],
    autoFixed: [],
    needsReview: [],
    missingImplementation: [],
    importErrors: []
  };

  const plannedFixes = new Map<string, { effectId: string; expectedMandatory: boolean; entry: AutoFixEntry }[]>();

  for (const row of mergedRows) {
    if (!row.CardID || !row.CardDetail) continue;
    const rawTriggers = extractRawTriggers(row.CardDetail);
    if (!rawTriggers.length) continue;
    report.summary.cardsWithTriggerText += 1;

    const scriptPath = path.join(options.scriptsDir, `${row.CardID}.ts`);
    if (!fs.existsSync(scriptPath)) {
      report.missingImplementation.push({
        cardId: row.CardID,
        cardName: row.CardName,
        cardNo: row.CardNo,
        reason: 'script file missing',
        rawText: rawTriggers.map(trigger => trigger.text).join('\n---\n')
      });
      continue;
    }

    let card: any;
    try {
      card = await loadCard(scriptPath);
    } catch (error) {
      report.importErrors.push({
        cardId: row.CardID,
        cardName: row.CardName,
        cardNo: row.CardNo,
        scriptPath,
        reason: error instanceof Error ? error.message : String(error)
      });
      continue;
    }

    const triggerEffects = triggerEffectsOf(card);
    if (!triggerEffects.length) {
      for (const raw of rawTriggers) {
        report.missingImplementation.push({
          cardId: row.CardID,
          cardName: row.CardName,
          cardNo: row.CardNo,
          scriptPath,
          rawText: raw.text,
          expected: raw.expectedMandatory === false ? 'optional' : 'mandatory',
          reason: 'Excel has trigger text but script has no TRIGGER effect'
        });
      }
      continue;
    }

    if (rawTriggers.length !== triggerEffects.length) {
      report.needsReview.push({
        cardId: row.CardID,
        cardName: row.CardName,
        cardNo: row.CardNo,
        scriptPath,
        reason: `trigger count mismatch: Excel ${rawTriggers.length}, script ${triggerEffects.length}`,
        rawText: rawTriggers.map(trigger => `#${trigger.index}: ${trigger.text}`).join('\n---\n')
      });
      continue;
    }

    for (let index = 0; index < rawTriggers.length; index += 1) {
      const raw = rawTriggers[index];
      const effect = triggerEffects[index];
      if (raw.reviewReason || raw.expectedMandatory === undefined) {
        report.needsReview.push({
          cardId: row.CardID,
          cardName: row.CardName,
          cardNo: row.CardNo,
          scriptPath,
          effectId: effect.id,
          rawText: raw.text,
          actual: stateLabel(effect.isMandatory),
          reason: raw.reviewReason || 'unable to classify trigger text'
        });
        continue;
      }

      const actualMandatory = effect.isMandatory === true;
      if (actualMandatory === raw.expectedMandatory) continue;
      if (raw.expectedMandatory === false && effect.isMandatory === undefined) continue;

      const entry: AutoFixEntry = {
        cardId: row.CardID,
        cardName: row.CardName,
        cardNo: row.CardNo,
        scriptPath,
        effectId: effect.id,
        rawText: raw.text,
        expected: raw.expectedMandatory ? 'mandatory' : 'optional',
        actual: stateLabel(effect.isMandatory),
        newValue: raw.expectedMandatory ? 'mandatory' : 'optional'
      };
      report.autoFixCandidates.push(entry);
      plannedFixes.set(scriptPath, [
        ...(plannedFixes.get(scriptPath) || []),
        { effectId: effect.id, expectedMandatory: raw.expectedMandatory, entry }
      ]);
    }
  }

  if (options.fix) {
    for (const [scriptPath, fixes] of plannedFixes) {
      for (const fix of fixes) {
        applyMandatoryFix(scriptPath, fix.effectId, fix.expectedMandatory);
        report.autoFixed.push(fix.entry);
      }
    }
  }

  report.summary.autoFixCandidates = report.autoFixCandidates.length;
  report.summary.autoFixed = report.autoFixed.length;
  report.summary.needsReview = report.needsReview.length;
  report.summary.missingImplementation = report.missingImplementation.length;
  report.summary.importErrors = report.importErrors.length;

  fs.mkdirSync(path.dirname(options.reportPath), { recursive: true });
  fs.writeFileSync(options.reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log([
    `cardsWithTriggerText=${report.summary.cardsWithTriggerText}`,
    `autoFixCandidates=${report.summary.autoFixCandidates}`,
    `autoFixed=${report.summary.autoFixed}`,
    `needsReview=${report.summary.needsReview}`,
    `missingImplementation=${report.summary.missingImplementation}`,
    `importErrors=${report.summary.importErrors}`,
    `report=${path.relative(process.cwd(), options.reportPath)}`
  ].join('\n'));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
