import 'server-only';
import { readJSON, readMarkdown } from './fileManager';
import { HeroData, Skill, Project, Capability, Experience } from '@/types';

export async function getHero(): Promise<HeroData | null> {
  return await readJSON<HeroData>('hero.json');
}

export async function getAbout(): Promise<string | null> {
  return await readMarkdown('about.md');
}

export async function getSkills(): Promise<Skill[] | null> {
  return await readJSON<Skill[]>('skills.json');
}

export async function getProjects(): Promise<Project[] | null> {
  return await readJSON<Project[]>('projects.json');
}

export async function getCapabilities(): Promise<Capability[] | null> {
  return await readJSON<Capability[]>('capabilities.json');
}

export async function getExperience(): Promise<Experience[] | null> {
  return await readJSON<Experience[]>('experience.json');
}
