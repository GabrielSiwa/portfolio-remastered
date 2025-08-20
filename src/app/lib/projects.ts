export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export interface ProjectFilterProps {
  technologies: string[];
  selectedTechnologies: string[];
  onTechnologyChange: (tech: string) => void;
}
