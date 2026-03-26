'use server';

import { revalidatePath } from 'next/cache';
import { readJSON, writeJSON, readMarkdown, writeMarkdown } from '@/lib/fileManager';
import { HeroData, Skill, Project, Experience } from '@/types';

export async function updateHero(data: HeroData) {
  const success = await writeJSON('hero.json', data);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update hero content' };
}

export async function updateAbout(content: string) {
  const success = await writeMarkdown('about.md', content);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update about content' };
}

export async function updateSkills(skills: Skill[]) {
  const success = await writeJSON('skills.json', skills);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update skills' };
}

export async function updateProjects(projects: Project[]) {
  const success = await writeJSON('projects.json', projects);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update projects' };
}

export async function updateCapabilities(capabilities: any[]) {
  const success = await writeJSON('capabilities.json', capabilities);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update capabilities' };
}

export async function updateExperience(experience: Experience[]) {
  const success = await writeJSON('experience.json', experience);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to update experience' };
}

export async function reorderProjects(projectIds: string[]) {
  const projects = await readJSON<Project[]>('projects.json');
  if (!projects) return { error: 'Could not load projects' };

  const reordered = projectIds.map((id, index) => {
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error(`Project ${id} not found`);
    return { ...project, order: index + 1 };
  });

  const success = await writeJSON('projects.json', reordered);
  if (success) {
    revalidatePath('/');
    return { success: true };
  }
  return { error: 'Failed to reorder projects' };
}

export async function fetchHero() {
  return await readJSON<HeroData>('hero.json');
}

export async function fetchAbout() {
  return await readMarkdown('about.md');
}

export async function fetchSkills() {
  return await readJSON<Skill[]>('skills.json');
}

export async function fetchProjects() {
  return await readJSON<Project[]>('projects.json');
}

export async function fetchCapabilities() {
  return await readJSON<any[]>('capabilities.json');
}

export async function fetchExperience() {
  return await readJSON<Experience[]>('experience.json');
}
