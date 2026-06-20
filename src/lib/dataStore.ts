import fs from 'fs';
import path from 'path';

const STORAGE_DIR = path.join(process.cwd(), 'storage');

export function readData<T>(type: string, fallback: T[]): T[] {
  try {
    const filePath = path.join(STORAGE_DIR, `${type}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T[];
    }
  } catch {}
  return fallback;
}

export function writeData<T>(type: string, data: T[]): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
  fs.writeFileSync(
    path.join(STORAGE_DIR, `${type}.json`),
    JSON.stringify(data, null, 2),
    'utf-8'
  );
}
