declare module '@/data/projects.json' {
    import { Project } from '@/types/Project';
    
    const data: {
      data: Project[];
    };
    
    export default data;
  }