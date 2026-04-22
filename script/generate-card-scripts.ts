import fs from 'node:fs';
import path from 'node:path';
import XLSX from 'xlsx';

type ScriptCardType = 'UNIT' | 'STORY' | 'ITEM';
type ScriptCardColor = 'RED' | 'WHITE' | 'YELLOW' | 'BLUE' | 'GREEN' | 'NONE';
type SupportedRarity = 'C' | 'U' | 'R' | 'SR' | 'UR' | 'SER' | 'PR';
type FallbackMode = 'none' | 'card-id';

type WorkbookRow = Record<string, unknown>;

type OverrideMap = {
  byCardId?: Record<string, string>;
  byName?: Record<string, string>;
  byCardNo?: Record<string, string>;
};

type Options = {
  cardPath: string;
  card2Path: string;
  outDir: string;
  overridesPath: string;
  unresolvedReportPath: string;
  force: boolean;
  dryRun: boolean;
  fallbackMode: FallbackMode;
  limit?: number;
};

type ResolvedCardId = {
  id: string;
  source: string;
};

type MergedCardRow = {
  CardID: string;
  CardName: string;
  CardType: string;
  CardColor: string;
  CardAccess: string;
  CardColorRequire: string;
  CardDamage: string;
  CardPower: string;
  CardBelong: string;
  CardOH: string;
  CardLimit: string;
  CardNo: string;
  CardRare: string;
  CardKeyWord: string;
  CardDetail: string;
  CardPackage: string;
  CardDesign: string;
  detailSourceIndex: number;
  idSourceIndex?: number;
};

const SUPPORTED_RARITIES: SupportedRarity[] = ['C', 'U', 'R', 'SR', 'UR', 'SER', 'PR'];
const RARITY_ALIASES: Record<string, SupportedRarity> = {
  TD: 'C',
  ESR: 'SER',
  OHR: 'UR'
};

const CARD_TYPE_MAP: Record<string, ScriptCardType> = {
  UNIT: 'UNIT',
  Unit: 'UNIT',
  unit: 'UNIT',
  STORY: 'STORY',
  Story: 'STORY',
  story: 'STORY',
  ITEM: 'ITEM',
  Item: 'ITEM',
  item: 'ITEM',
  Itme: 'ITEM'
};

const CARD_COLOR_MAP: Record<string, ScriptCardColor> = {
  红: 'RED',
  白: 'WHITE',
  黄: 'YELLOW',
  蓝: 'BLUE',
  绿: 'GREEN',
  无: 'NONE',
  RED: 'RED',
  WHITE: 'WHITE',
  YELLOW: 'YELLOW',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  NONE: 'NONE'
};

const COLOR_REQUIRE_MAP: Record<string, Exclude<ScriptCardColor, 'NONE'>> = {
  红: 'RED',
  白: 'WHITE',
  黄: 'YELLOW',
  蓝: 'BLUE',
  绿: 'GREEN'
};

function parseArgs(argv: string[]): Options {
  const repoRoot = process.cwd();
  const options: Options = {
    cardPath: path.resolve(repoRoot, '..', 'Card.xlsx'),
    card2Path: path.resolve(repoRoot, '..', 'Card2.xlsx'),
    outDir: path.resolve(repoRoot, 'src', 'scripts'),
    overridesPath: path.resolve(repoRoot, 'script', 'card-id-overrides.json'),
    unresolvedReportPath: path.resolve(repoRoot, 'script', 'unresolved-card-ids.json'),
    force: false,
    dryRun: false,
    fallbackMode: 'none'
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    switch (current) {
      case '--card':
        options.cardPath = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--card2':
        options.card2Path = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--out':
        options.outDir = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--overrides':
        options.overridesPath = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--unresolved-report':
        options.unresolvedReportPath = path.resolve(repoRoot, requireValue(current, next));
        index += 1;
        break;
      case '--force':
        options.force = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--fallback-mode':
        options.fallbackMode = parseFallbackMode(requireValue(current, next));
        index += 1;
        break;
      case '--limit':
        options.limit = Number.parseInt(requireValue(current, next), 10);
        if (!Number.isFinite(options.limit) || options.limit < 1) {
          throw new Error(`--limit 必须是大于 0 的整数，收到: ${next}`);
        }
        index += 1;
        break;
      case '--help':
        printHelp();
        process.exit(0);
        break;
      default:
        throw new Error(`未知参数: ${current}`);
    }
  }

  return options;
}

function requireValue(flag: string, value: string | undefined): string {
  if (!value || value.startsWith('--')) {
    throw new Error(`${flag} 需要一个值`);
  }
  return value;
}

function parseFallbackMode(value: string): FallbackMode {
  if (value === 'none' || value === 'card-id') {
    return value;
  }
  throw new Error(`--fallback-mode 仅支持 none 或 card-id，收到: ${value}`);
}

function printHelp() {
  console.log(
    [
      '用法: tsx script/generate-card-scripts.ts [options]',
      '',
      '选项:',
      '  --card <path>               Card.xlsx 路径',
      '  --card2 <path>              Card2.xlsx 路径',
      '  --out <dir>                 输出目录，默认 src/scripts',
      '  --overrides <path>          自定义卡牌 ID 映射 JSON',
      '  --unresolved-report <path>  未解析卡牌报告 JSON',
      '  --fallback-mode <mode>      none | card-id，默认 none',
      '  --force                     覆盖已存在文件',
      '  --dry-run                   仅统计，不写文件',
      '  --limit <n>                 只处理前 n 张卡，便于预览',
      '  --help                      显示帮助'
    ].join('\n')
  );
}

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

function normalizeNameKey(value: string): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[【】「」『』\[\]（）()]/g, '')
    .replace(/[·・•．。'"“”‘’`~!@#$%^&*_=+|\\/,:;?.<>\-\s]/g, '');
}

function normalizeFlag(value: unknown): boolean {
  const text = normalizeText(value).toLowerCase();
  return text === 'true' || text === '1' || text === 'yes';
}

function readWorkbookRows(filePath: string): WorkbookRow[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel 文件不存在: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error(`Excel 文件没有可读取的工作表: ${filePath}`);
  }

  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: '' }) as WorkbookRow[];
}

function buildIdLookup(cardRows: WorkbookRow[]): Map<string, { cardId: string; sourceIndex: number }> {
  const idLookup = new Map<string, { cardId: string; sourceIndex: number }>();
  const normalizedLookup = new Map<string, { cardId: string; sourceIndex: number }[]>();

  cardRows.forEach((row, index) => {
    const cardName = normalizeText(row.CardName);
    const cardId = normalizeText(row.CardID);
    if (!cardName || !cardId) return;
    const entry = { cardId, sourceIndex: index + 2 };
    idLookup.set(cardName, entry);

    const normalizedKey = normalizeNameKey(cardName);
    const bucket = normalizedLookup.get(normalizedKey) ?? [];
    bucket.push(entry);
    normalizedLookup.set(normalizedKey, bucket);
  });

  normalizedLookup.forEach((entries, key) => {
    if (entries.length === 1 && !idLookup.has(key)) {
      idLookup.set(key, entries[0]);
    }
  });

  return idLookup;
}

function mergeRows(cardRows: WorkbookRow[], detailRows: WorkbookRow[]): MergedCardRow[] {
  const idLookup = buildIdLookup(cardRows);

  return detailRows.map((detailRow, index) => {
    const cardName = normalizeText(detailRow.CardName);
    const idMatch = idLookup.get(cardName) ?? idLookup.get(normalizeNameKey(cardName));
    const pick = (field: string) => normalizeText(detailRow[field]);

    return {
      CardID: idMatch?.cardId ?? '',
      CardName: cardName,
      CardType: pick('CardType'),
      CardColor: pick('CardColor'),
      CardAccess: pick('CardAccess'),
      CardColorRequire: pick('CardColorRequire'),
      CardDamage: pick('CardDamage'),
      CardPower: pick('CardPower'),
      CardBelong: pick('CardBelong') || '无',
      CardOH: pick('CardOH'),
      CardLimit: pick('CardLimit'),
      CardNo: pick('CardNo'),
      CardRare: pick('CardRare'),
      CardKeyWord: pick('CardKeyWord'),
      CardDetail: pick('CardDetail'),
      CardPackage: pick('CardPackage'),
      CardDesign: pick('CardDesign'),
      detailSourceIndex: index + 2,
      idSourceIndex: idMatch?.sourceIndex
    };
  });
}

function loadOverrides(filePath: string): OverrideMap {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as OverrideMap | Record<string, string>;

  if ('byCardId' in parsed || 'byName' in parsed || 'byCardNo' in parsed) {
    return parsed as OverrideMap;
  }

  return { byCardId: parsed as Record<string, string> };
}

function loadExistingNameToIdMap(scriptsDir: string): Map<string, string> {
  const nameToId = new Map<string, string>();
  const normalizedEntries = new Map<string, string[]>();
  if (!fs.existsSync(scriptsDir)) {
    return nameToId;
  }

  const files = fs.readdirSync(scriptsDir).filter((file) => file.endsWith('.ts'));
  for (const file of files) {
    const fullPath = path.join(scriptsDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const nameMatch = content.match(/fullName:\s*'([^']+)'/);
    const fileId = path.basename(file, '.ts');
    if (fileId && nameMatch?.[1]) {
      nameToId.set(nameMatch[1], fileId);

      const normalizedKey = normalizeNameKey(nameMatch[1]);
      const bucket = normalizedEntries.get(normalizedKey) ?? [];
      bucket.push(fileId);
      normalizedEntries.set(normalizedKey, bucket);
    }
  }

  normalizedEntries.forEach((ids, key) => {
    if (ids.length === 1 && !nameToId.has(key)) {
      nameToId.set(key, ids[0]);
    }
  });

  return nameToId;
}

function resolveCardId(
  row: MergedCardRow,
  existingNameToId: Map<string, string>,
  overrides: OverrideMap,
  fallbackMode: FallbackMode
): ResolvedCardId | null {
  const cardId = row.CardID;
  const overrideByCardId = overrides.byCardId?.[cardId];
  if (overrideByCardId) return { id: overrideByCardId, source: 'override:card-id' };

  const overrideByCardNo = overrides.byCardNo?.[row.CardNo];
  if (overrideByCardNo) return { id: overrideByCardNo, source: 'override:card-no' };

  const overrideByName = overrides.byName?.[row.CardName];
  if (overrideByName) return { id: overrideByName, source: 'override:name' };

  if (cardId) {
    return { id: cardId, source: 'card-xlsx' };
  }

  const existingId = existingNameToId.get(row.CardName) ?? existingNameToId.get(normalizeNameKey(row.CardName));
  if (existingId) return { id: existingId, source: 'existing-script' };

  if (fallbackMode === 'card-id' && cardId) {
    return {
      id: `9${cardId.padStart(7, '0')}`,
      source: 'fallback:card-id'
    };
  }

  return null;
}

function parseCardType(value: string): ScriptCardType {
  const result = CARD_TYPE_MAP[value];
  if (!result) {
    throw new Error(`无法识别的卡牌类型: ${value}`);
  }
  return result;
}

function parseCardColor(value: string): ScriptCardColor {
  const result = CARD_COLOR_MAP[value];
  if (!result) {
    throw new Error(`无法识别的卡牌颜色: ${value}`);
  }
  return result;
}

function parseNumber(value: string): number {
  const numeric = Number.parseInt(value, 10);
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseColorRequirement(value: string): Record<string, number> {
  const normalized = normalizeText(value);
  if (!normalized || normalized === '无') {
    return {};
  }

  const requirements: Record<string, number> = {};
  for (const character of normalized) {
    const mappedColor = COLOR_REQUIRE_MAP[character];
    if (!mappedColor) continue;
    requirements[mappedColor] = (requirements[mappedColor] ?? 0) + 1;
  }

  return requirements;
}

function parseRarities(value: string): SupportedRarity[] {
  const tokens = normalizeText(value)
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean)
    .map((item) => RARITY_ALIASES[item] ?? item)
    .filter((item): item is SupportedRarity => SUPPORTED_RARITIES.includes(item as SupportedRarity));

  if (tokens.length === 0) {
    return ['C'];
  }

  return Array.from(new Set(tokens));
}

function inferSpecialName(fullName: string, type: ScriptCardType): string {
  if (type === 'STORY') {
    return '';
  }

  const matches = [...fullName.matchAll(/[【「\[]([^】」\]]+)[】」\]]/g)];
  if (matches.length === 0) {
    return '';
  }

  return normalizeText(matches[matches.length - 1][1]);
}

function inferGodMark(row: MergedCardRow, type: ScriptCardType): boolean {
  if (type !== 'UNIT' && type !== 'ITEM') {
    return false;
  }

  if (normalizeFlag(row.CardLimit)) {
    return true;
  }

  return /[【「\[][^】」\]]+[】」\]]/.test(row.CardName) && type === 'UNIT';
}

function hasKeyword(row: MergedCardRow, keyword: string): boolean {
  return row.CardKeyWord.includes(keyword) || row.CardDetail.includes(keyword);
}

function escapeTsString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}

function formatColorRequirement(colorReq: Record<string, number>): string {
  const entries = Object.entries(colorReq);
  if (entries.length === 0) {
    return '{}';
  }

  return `{ ${entries.map(([key, value]) => `${key}: ${value}`).join(', ')} }`;
}

function buildComment(row: MergedCardRow, resolved: ResolvedCardId): string {
  const lines = [
    '/**',
    ' * Auto-generated from Card.xlsx + Card2.xlsx.',
    ` * Source CardID: ${row.CardID || 'N/A'}`,
    ` * Card2 Row: ${row.detailSourceIndex}`,
    ` * Card Row: ${row.idSourceIndex ?? 'N/A'}`,
    ` * Source CardNo: ${row.CardNo || 'N/A'}`,
    ` * Package: ${row.CardPackage || 'N/A'}`,
    ` * ID Source: ${resolved.source}`,
    ` * Keywords: ${row.CardKeyWord || 'N/A'}`,
    ' * Card Detail:'
  ];

  const detailLines = (row.CardDetail || 'N/A').split('\n');
  detailLines.forEach((detailLine) => {
    lines.push(` * ${detailLine.replace(/\*\//g, '*\\/')}`);
  });

  lines.push(' * TODO: confirm ID / godMark / rarity variants and implement effects.');
  lines.push(' */');
  return lines.join('\n');
}

function buildCardFile(row: MergedCardRow, resolved: ResolvedCardId, importPath: string): string {
  const type = parseCardType(row.CardType);
  const color = parseCardColor(row.CardColor);
  const colorReq = parseColorRequirement(row.CardColorRequire);
  const rarities = parseRarities(row.CardRare);
  const rarity = rarities[0];
  const specialName = inferSpecialName(row.CardName, type);
  const godMark = inferGodMark(row, type);
  const feijingMark = hasKeyword(row, '菲晶');
  const isRush = hasKeyword(row, '速攻');
  const isAnnihilation = hasKeyword(row, '歼灭');
  const isHeroic = hasKeyword(row, '英勇');
  const isShenyi = hasKeyword(row, '神依');
  const acValue = parseNumber(row.CardAccess);
  const power = parseNumber(row.CardPower);
  const damage = parseNumber(row.CardDamage);

  const fields: string[] = [
    `  id: '${escapeTsString(resolved.id)}',`,
    `  fullName: '${escapeTsString(row.CardName)}',`,
    `  specialName: '${escapeTsString(specialName)}',`,
    `  type: '${type}',`,
    `  color: '${color}',`,
    '  gamecardId: null as any,',
    `  colorReq: ${formatColorRequirement(colorReq)},`,
    `  faction: '${escapeTsString(row.CardBelong || '无')}',`,
    `  acValue: ${acValue},`
  ];

  if (type === 'UNIT') {
    fields.push(`  power: ${power},`);
    fields.push(`  basePower: ${power},`);
    fields.push(`  damage: ${damage},`);
    fields.push(`  baseDamage: ${damage},`);
  }

  fields.push(`  godMark: ${godMark ? 'true' : 'false'},`);
  fields.push("  displayState: 'FRONT_UPRIGHT',");

  if (type === 'UNIT') {
    fields.push('  isExhausted: false,');
    fields.push(`  isrush: ${isRush ? 'true' : 'false'},`);
    if (isAnnihilation) fields.push('  isAnnihilation: true,');
    if (isHeroic) fields.push('  isHeroic: true,');
    if (isShenyi) fields.push('  isShenyi: true,');
    fields.push('  canAttack: true,');
  }

  fields.push(`  feijingMark: ${feijingMark ? 'true' : 'false'},`);
  fields.push('  canResetCount: 0,');
  fields.push('  effects: [],');
  fields.push(`  rarity: '${rarity}',`);
  fields.push(`  availableRarities: [${rarities.map((item) => `'${item}'`).join(', ')}],`);
  fields.push(`  cardPackage: '${escapeTsString(row.CardPackage)}',`);
  fields.push('  uniqueId: null as any,');

  return [
    `import { Card } from '${importPath}';`,
    '',
    buildComment(row, resolved),
    `const card: Card = {\n${fields.join('\n')}\n};`,
    '',
    'export default card;',
    ''
  ].join('\n');
}

function ensureDirectory(filePath: string) {
  fs.mkdirSync(filePath, { recursive: true });
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const cardRows = readWorkbookRows(options.cardPath);
  const detailRows = readWorkbookRows(options.card2Path);
  const mergedRows = mergeRows(cardRows, detailRows);
  const existingNameToId = loadExistingNameToIdMap(path.resolve(process.cwd(), 'src', 'scripts'));
  const overrides = loadOverrides(options.overridesPath);

  const rowsToProcess = options.limit ? mergedRows.slice(0, options.limit) : mergedRows;
  const unresolvedRows: Array<Record<string, string>> = [];

  let resolvedCount = 0;
  let writtenCount = 0;
  let skippedExistingCount = 0;

  ensureDirectory(path.dirname(options.unresolvedReportPath));

  if (!options.dryRun) {
    ensureDirectory(options.outDir);
  }

  for (const row of rowsToProcess) {
    const resolved = resolveCardId(row, existingNameToId, overrides, options.fallbackMode);
    if (!resolved) {
      unresolvedRows.push({
        CardID: row.CardID,
        CardName: row.CardName,
        CardNo: row.CardNo,
        Package: row.CardPackage,
        DetailRow: String(row.detailSourceIndex),
        SuggestedFallbackId: row.CardID ? `9${row.CardID.padStart(7, '0')}` : ''
      });
      continue;
    }

    resolvedCount += 1;

    const targetPath = path.join(options.outDir, `${resolved.id}.ts`);
    if (!options.force && fs.existsSync(targetPath)) {
      skippedExistingCount += 1;
      continue;
    }

    if (!options.dryRun) {
      const relativeImportPath = path
        .relative(path.dirname(targetPath), path.resolve(process.cwd(), 'src', 'types', 'game'))
        .replace(/\\/g, '/');
      const normalizedImportPath = relativeImportPath.startsWith('.') ? relativeImportPath : `./${relativeImportPath}`;
      const fileContent = buildCardFile(row, resolved, normalizedImportPath);
      fs.writeFileSync(targetPath, fileContent, 'utf8');
      writtenCount += 1;
    }
  }

  fs.writeFileSync(options.unresolvedReportPath, `${JSON.stringify(unresolvedRows, null, 2)}\n`, 'utf8');

  console.log(`Card rows: ${rowsToProcess.length}`);
  console.log(`Resolved IDs: ${resolvedCount}`);
  console.log(`Written files: ${writtenCount}`);
  console.log(`Skipped existing files: ${skippedExistingCount}`);
  console.log(`Unresolved rows: ${unresolvedRows.length}`);
  console.log(`Unresolved report: ${options.unresolvedReportPath}`);

  if (options.dryRun) {
    console.log('Dry run completed. No files were written.');
  }
}

main();
