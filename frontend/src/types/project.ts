export interface Project {
    id: string;
    fields: {
      Titre?: string;
      Description?: string;
      Publié?: boolean;
      Likes?: number;
      [key: string]: unknown;
    };
  }
  