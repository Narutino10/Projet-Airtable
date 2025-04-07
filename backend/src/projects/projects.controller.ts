import { Controller, Get, Param, Post, Query, Patch, Body, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getPublished() {
    return this.projectsService.getPublished();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectsService.getOne(id);
  }

  @Post(':id/like')
  addLike(@Param('id') id: string) {
    return this.projectsService.addLike(id);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.projectsService.search(q);
  }

  @Patch('publish/:id')
  @UseGuards(JwtAuthGuard)
  togglePublish(@Param('id') id: string, @Body() body: { published: boolean }) {
    return this.projectsService.togglePublish(id, body.published);
  }
}