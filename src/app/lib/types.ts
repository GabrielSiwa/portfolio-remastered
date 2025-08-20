export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
  }[];
  updatedAt: Date;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
  };
  updatedAt: Date;
}
