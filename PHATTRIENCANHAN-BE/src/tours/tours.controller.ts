import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './entities/tours.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
  ): Promise<{ data: Tour[]; total: number }> {
    return this.toursService.findAll(page, limit);
  }

  @Get('new')
  findNewTours(): Promise<Tour[]> {
    return this.toursService.findNewTours();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tour> {
    return this.toursService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() tourData: Partial<Tour>): Promise<Tour> {
    return this.toursService.create(tourData);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() tourData: Partial<Tour>): Promise<Tour> {
    return this.toursService.update(+id, tourData);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toursService.remove(+id);
  }
} 