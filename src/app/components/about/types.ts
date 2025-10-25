/**
 * Shared TypeScript types for About section
 */

export interface Skill {
  readonly name: string;
  readonly years: number;
  readonly icon: string;
}

export interface FilteredSkillItem {
  skill: Skill;
  category: string;
  categoryName: string;
}

export interface Filters {
  experience: string[];
  type: string[];
  proficiency: string[];
}

export type FilteredSkillsResult =
  | { type: "category"; skills: readonly Skill[] }
  | { type: "filtered"; skills: FilteredSkillItem[]; totalCount: number };
