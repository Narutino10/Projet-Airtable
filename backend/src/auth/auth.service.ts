import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin({ email, password }) {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Admins?filterByFormula=Email='${email}'`;
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    });

    const record = res.data.records[0];
    if (!record) return null;

    const valid = await bcrypt.compare(password, record.fields["Mot de passe hashé"]);
    if (!valid) return null;

    return this.jwtService.sign({ email });
  }
}