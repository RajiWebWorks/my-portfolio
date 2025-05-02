export interface Project {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface ProjectsData {
  data: Project[];
}