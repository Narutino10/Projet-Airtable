import { Injectable } from '@nestjs/common';
import { AirtableService } from '../airtable/airtable.service';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  constructor(private airtable: AirtableService) {}

  async getPublished(): Promise<Project[]> {
    const records = await this.airtable.get(
      'Projets',
      'filterByFormula=Publié=TRUE()',
    );
    return records as Project[];
  }

  async getOne(id: string): Promise<Project[]> {
    const result = await this.airtable.get(
      'Projets',
      `filterByFormula=RECORD_ID()='${id}'`,
    );
    return result as Project[];
  }

  async addLike(id: string): Promise<Project> {
    const [project] = await this.getOne(id);
    const currentLikes = project?.fields?.Likes ?? 0;
    return this.airtable.update('Projets', id, {
      Likes: currentLikes + 1,
    }) as Promise<Project>;
  }

  async search(q: string): Promise<Project[]> {
    const formula = encodeURIComponent(
      `SEARCH(LOWER("${q}"), LOWER({Mots-clés}))`,
    );
    const records = await this.airtable.get(
      'Projets',
      `filterByFormula=${formula}`,
    );
    return records as Project[];
  }

  async togglePublish(id: string, published: boolean): Promise<Project> {
    return this.airtable.update('Projets', id, {
      Publié: published,
    }) as Promise<Project>;
  }
}
