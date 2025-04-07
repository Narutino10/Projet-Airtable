import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { AirtableModule } from './airtable/airtable.module';

@Module({
  imports: [AuthModule, ProjectsModule, AirtableModule],
})
export class AppModule {}
