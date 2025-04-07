import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AirtableService {
  private baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

  private headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  };

  async get(table: string, query = '') {
    const url = \`\${this.baseUrl}/\${table}?\${query}\`;
    const res = await axios.get(url, { headers: this.headers });
    return res.data.records;
  }

  async update(table: string, id: string, fields: any) {
    const url = \`\${this.baseUrl}/\${table}/\${id}\`;
    const res = await axios.patch(
      url,
      { fields },
      { headers: this.headers }
    );
    return res.data;
  }
}