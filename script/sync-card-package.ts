import fs from 'node:fs';
import path from 'node:path';
import XLSX from 'xlsx';

type WorkbookRow = Record<string, unknown>;

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

function readWorkbookRows(filePath: string): WorkbookRow[] {
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error(`Excel 文件没有可读取工作表: ${filePath}`);
  }
  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: '' }) as WorkbookRow[];
}

function buildPackageMaps(cardRows: WorkbookRow[], detailRows: WorkbookRow[]) {
  const cardIdByName = new Map<string, string>();
  const packageByName = new Map<string, string>();
  const packageByNormalizedName = new Map<string, string[]>();

  cardRows.forEach((row) => {
    const name = normalizeText(row.CardName);
    const id = normalizeText(row.CardID);
    if (!name || !id) return;
    cardIdByName.set(name, id);
  });

  const packageById = new Map<string, string>();
  detailRows.forEach((row) => {
    const name = normalizeText(row.CardName);
    const cardPackage = normalizeText(row.CardPackage);
    const id = cardIdByName.get(name);
    if (!name) return;

    packageByName.set(name, cardPackage);

    const normalizedName = normalizeNameKey(name);
    const bucket = packageByNormalizedName.get(normalizedName) ?? [];
    bucket.push(cardPackage);
    packageByNormalizedName.set(normalizedName, bucket);

    if (id) {
      packageById.set(id, cardPackage);
    }
  });

  return { packageById, packageByName, packageByNormalizedName };
}

function upsertCardPackage(content: string, cardPackage: string): string {
  const escaped = cardPackage.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const line = `  cardPackage: '${escaped}',`;

  if (/^\s*cardPackage:\s*'.*',\s*$/m.test(content)) {
    return content.replace(/^\s*cardPackage:\s*'.*',\s*$/m, line);
  }

  if (/^\s*availableRarities:\s*\[[^\n]*\],\s*$/m.test(content)) {
    return content.replace(/^(\s*availableRarities:\s*\[[^\n]*\],\s*)$/m, `$1\n${line}`);
  }

  if (/^\s*rarity:\s*'.*',\s*$/m.test(content)) {
    return content.replace(/^(\s*rarity:\s*'.*',\s*)$/m, `$1\n${line}`);
  }

  throw new Error('无法定位 rarity/availableRarities 插入 cardPackage');
}

function main() {
  const repoRoot = process.cwd();
  const cardPath = path.resolve(repoRoot, '..', 'Card.xlsx');
  const card2Path = path.resolve(repoRoot, '..', 'Card2.xlsx');
  const scriptsDir = path.resolve(repoRoot, 'src', 'scripts');

  const cardRows = readWorkbookRows(cardPath);
  const detailRows = readWorkbookRows(card2Path);
  const { packageById, packageByName, packageByNormalizedName } = buildPackageMaps(cardRows, detailRows);

  let updated = 0;
  let skipped = 0;

  fs.readdirSync(scriptsDir)
    .filter((file) => file.endsWith('.ts'))
    .forEach((file) => {
      const id = path.basename(file, '.ts');
      const fullPath = path.join(scriptsDir, file);
      const original = fs.readFileSync(fullPath, 'utf8');
      const fullName = (original.match(/\bfullName:\s*'([^']+)'/) || [])[1] || '';

      let cardPackage = packageById.get(id) ?? packageByName.get(fullName);
      if (!cardPackage && fullName) {
        const normalizedMatches = packageByNormalizedName.get(normalizeNameKey(fullName)) ?? [];
        if (normalizedMatches.length === 1) {
          [cardPackage] = normalizedMatches;
        }
      }

      if (!cardPackage) {
        skipped += 1;
        return;
      }

      const next = upsertCardPackage(original, cardPackage);

      if (next !== original) {
        fs.writeFileSync(fullPath, next, 'utf8');
        updated += 1;
      }
    });

  console.log(`Updated cardPackage in ${updated} scripts.`);
  console.log(`Skipped ${skipped} scripts without Card2 package mapping.`);
}

main();
