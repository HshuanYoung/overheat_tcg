import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import XLSX from 'xlsx';

type WorkbookRow = Record<string, unknown>;

type MatchRecord = {
  rel: string;
  oldId: string;
  name: string;
  newId: string;
  source: 'exact' | 'canonical';
};

type UnmatchedRecord = {
  rel: string;
  oldId: string;
  name: string;
};

const repoRoot = process.cwd();
const cardPath = path.resolve(repoRoot, '..', 'Card.xlsx');
const unmatchedReportPath = path.resolve(repoRoot, 'script', 'existing-script-id-unmatched.json');

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

function readCardRows(filePath: string): WorkbookRow[] {
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error(`Card.xlsx 没有可读取工作表: ${filePath}`);
  }
  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: '' }) as WorkbookRow[];
}

function buildCardLookup(rows: WorkbookRow[]) {
  const exact = new Map<string, string>();
  const canonical = new Map<string, string[]>();

  rows.forEach((row) => {
    const name = normalizeText(row.CardName);
    const id = normalizeText(row.CardID);
    if (!name || !id) return;

    exact.set(name, id);

    const key = normalizeNameKey(name);
    const bucket = canonical.get(key) ?? [];
    bucket.push(id);
    canonical.set(key, bucket);
  });

  return { exact, canonical };
}

function getTrackedScriptFiles(): string[] {
  const output = execSync('git ls-files src/scripts/*.ts', {
    cwd: repoRoot,
    encoding: 'utf8'
  }).trim();

  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function readTrackedFileFromHead(rel: string): string {
  return execSync(`git show HEAD:${rel}`, {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}

function parseCardBlock(content: string): { id: string; name: string } | null {
  const match = content.match(/const\s+card\s*:\s*Card\s*=\s*\{([\s\S]*?)\n\};/);
  if (!match) return null;

  const block = match[1];
  const id = (block.match(/\bid:\s*'([^']+)'/) || [])[1] || '';
  const name = (block.match(/\bfullName:\s*'([^']+)'/) || [])[1] || '';
  return { id, name };
}

function getMatches(): { matched: MatchRecord[]; unmatched: UnmatchedRecord[] } {
  const rows = readCardRows(cardPath);
  const lookup = buildCardLookup(rows);
  const trackedFiles = getTrackedScriptFiles();

  const matched: MatchRecord[] = [];
  const unmatched: UnmatchedRecord[] = [];

  trackedFiles.forEach((rel) => {
    const fullPath = path.resolve(repoRoot, rel);
    const content = readTrackedFileFromHead(rel);
    const parsed = parseCardBlock(content);
    if (!parsed) return;

    const exactId = lookup.exact.get(parsed.name);
    if (exactId) {
      matched.push({ rel, oldId: parsed.id, name: parsed.name, newId: exactId, source: 'exact' });
      return;
    }

    const key = normalizeNameKey(parsed.name);
    const canonicalIds = lookup.canonical.get(key) ?? [];
    if (canonicalIds.length === 1) {
      matched.push({ rel, oldId: parsed.id, name: parsed.name, newId: canonicalIds[0], source: 'canonical' });
      return;
    }

    unmatched.push({ rel, oldId: parsed.id, name: parsed.name });
  });

  return { matched, unmatched };
}

function replaceAllExact(text: string, replacements: Array<{ from: string; to: string }>) {
  let next = text;
  replacements.forEach(({ from, to }) => {
    if (!from || from === to) return;
    next = next.split(from).join(to);
  });
  return next;
}

function migrateMatchedScripts(matched: MatchRecord[]) {
  const replacements = matched
    .filter((item) => item.oldId && item.oldId !== item.newId)
    .map((item) => ({ from: item.oldId, to: item.newId }));

  matched.forEach((item) => {
    const oldPath = path.resolve(repoRoot, item.rel);
    const newPath = path.resolve(repoRoot, 'src', 'scripts', `${item.newId}.ts`);
    const originalContent = readTrackedFileFromHead(item.rel);
    const newContent = replaceAllExact(originalContent, replacements);

    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.writeFileSync(newPath, newContent, 'utf8');

    if (path.normalize(oldPath) !== path.normalize(newPath) && fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  });
}

function replaceRepoReferences(matched: MatchRecord[]) {
  const replacements = matched
    .filter((item) => item.oldId && item.oldId !== item.newId)
    .map((item) => ({ from: item.oldId, to: item.newId }));

  const roots = [
    path.resolve(repoRoot, 'src'),
    path.resolve(repoRoot, 'server'),
    path.resolve(repoRoot, 'script')
  ];

  const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.json', '.md', '.sql', '.css', '.html']);
  const skipNames = new Set(['node_modules', 'dist', '.git', 'pics']);

  const visit = (targetPath: string) => {
    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      const baseName = path.basename(targetPath);
      if (skipNames.has(baseName)) return;
      if (path.normalize(targetPath) === path.normalize(path.resolve(repoRoot, 'src', 'scripts'))) return;
      fs.readdirSync(targetPath).forEach((entry) => visit(path.join(targetPath, entry)));
      return;
    }

    if (!allowedExtensions.has(path.extname(targetPath))) return;

    const original = fs.readFileSync(targetPath, 'utf8');
    const next = replaceAllExact(original, replacements);
    if (next !== original) {
      fs.writeFileSync(targetPath, next, 'utf8');
    }
  };

  roots.forEach((root) => {
    if (fs.existsSync(root)) visit(root);
  });
}

function main() {
  const { matched, unmatched } = getMatches();

  fs.mkdirSync(path.dirname(unmatchedReportPath), { recursive: true });
  fs.writeFileSync(unmatchedReportPath, `${JSON.stringify(unmatched, null, 2)}\n`, 'utf8');

  migrateMatchedScripts(matched);
  replaceRepoReferences(matched);

  console.log(`Matched existing scripts: ${matched.length}`);
  console.log(`Unmatched existing scripts: ${unmatched.length}`);
  console.log(`Unmatched report: ${unmatchedReportPath}`);
}

main();
