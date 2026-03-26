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

export async function writeJSON<T>(filename: string, data: T): Promise<boolean> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing JSON file ${filename}:`, error);
    return false;
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

export async function writeMarkdown(filename: string, content: string): Promise<boolean> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing Markdown file ${filename}:`, error);
    return false;
  }
}
