export interface Project {
  id: string;
  fields: {
    Likes?: number;
    Publié?: boolean;
    [key: string]: any;
  };
}
