import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

const generatedDir = path.join('server', 'generated');
const manifestPath = path.join(generatedDir, 'card_manifest.ts');
const scriptsDir = path.join('src', 'scripts');
const cardFiles = fs.readdirSync(scriptsDir)
  .filter(file => file.endsWith('.ts'))
  .sort();

fs.mkdirSync(generatedDir, { recursive: true });
const placeholder = 'export const bundledCardModules: any[] = [];\n';

try {
  fs.writeFileSync(
    manifestPath,
    `${cardFiles.map((file, index) => `import * as cardModule${index} from '../../src/scripts/${file}';`).join('\n')}\n\nexport const bundledCardModules = [${cardFiles.map((_, index) => `cardModule${index}`).join(', ')}];\n`
  );

  await build({
    entryPoints: ['server/index.ts'],
    outfile: 'build/server/index.js',
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: ['node22'],
    sourcemap: false,
    minify: false,
    packages: 'external',
    logLevel: 'info',
  });
} finally {
  fs.writeFileSync(manifestPath, placeholder);
}
