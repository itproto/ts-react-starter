import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { toSnippet } from './utils';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const main = async () => {
  const srcDir = path.join(__dirname, '../templates');
  const files = await readdir(srcDir);
  if (!files) {
    return;
  }
  const content = await readFile(path.join(srcDir, files[0]), {
    encoding: 'utf8'
  });
  const outFile = path.join(__dirname, '../temp', 'snippet.json');
  const transformed = toSnippet(content);
  console.info(transformed);
  await writeFile(outFile, `[${transformed}]`, { encoding: 'utf8' });
};

main();
