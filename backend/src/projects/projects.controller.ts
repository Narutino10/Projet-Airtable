import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project } from './project.model';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getPublished(): Promise<Project[]> {
    return this.projectsService.getPublished();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Project[]> {
    return this.projectsService.getOne(id);
  }

  @Post(':id/like')
  addLike(@Param('id') id: string): Promise<Project> {
    return this.projectsService.addLike(id);
  }

  @Get('search')
  search(@Query('q') q: string): Promise<Project[]> {
    return this.projectsService.search(q);
  }

  @Patch('publish/:id')
  @UseGuards(JwtAuthGuard)
  togglePublish(
    @Param('id') id: string,
    @Body() body: { published: boolean },
  ): Promise<Project> {
    return this.projectsService.togglePublish(id, body.published);
  }
}
