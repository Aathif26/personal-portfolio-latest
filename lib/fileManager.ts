import 'server-only';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function readJSON<T>(filename: string): Promise<T | null> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file ${filename}:`, error);
    return null;
  }
}

export async function readMarkdown(filename: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading Markdown file ${filename}:`, error);
    return null;
  }
}
