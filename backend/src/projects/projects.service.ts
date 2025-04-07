import { Injectable } from '@nestjs/common';
import { AirtableService } from '../airtable/airtable.service';

@Injectable()
export class ProjectsService {
  constructor(private airtable: AirtableService) {}

  async getPublished() {
    return this.airtable.get('Projets', 'filterByFormula=Publié=TRUE()');
  }

  async getOne(id: string) {
    return this.airtable.get('Projets', \`filterByFormula=RECORD_ID()='\${id}'\`);
  }

  async addLike(id: string) {
    const project = await this.getOne(id);
    const current = project[0]?.fields?.Likes || 0;
    return this.airtable.update('Projets', id, { Likes: current + 1 });
  }

  async search(q: string) {
    const formula = encodeURIComponent(\`SEARCH(LOWER("\${q}"), LOWER({Mots-clés}))\`);
    return this.airtable.get('Projets', \`filterByFormula=\${formula}\`);
  }

  async togglePublish(id: string, published: boolean) {
    return this.airtable.update('Projets', id, { Publié: published });
  }
}