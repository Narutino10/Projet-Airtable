import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { AirtableModule } from './airtable/airtable.module';

@Module({
  imports: [AuthModule, ProjectsModule, AirtableModule, ConfigModule],
})
export class AppModule {}
