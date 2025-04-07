import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AirtableService {
  private baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

  private headers = {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  };

  async get(table: string, query = ''): Promise<any[]> {
    const url = `${this.baseUrl}/${table}?${query}`;
    const res: AxiosResponse<{ records: any[] }> = await axios.get(url, {
      headers: this.headers,
    });
    return res.data.records;
  }

  async update<T>(table: string, id: string, fields: T): Promise<any> {
    const url = `${this.baseUrl}/${table}/${id}`;
    const res: AxiosResponse<any> = await axios.patch(
      url,
      { fields },
      { headers: this.headers },
    );
    return res.data;
  }
}
