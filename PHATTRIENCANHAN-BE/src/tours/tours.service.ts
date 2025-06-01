import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tours.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private toursRepository: Repository<Tour>,
  ) {}

  async findAll(page = 1, limit = 6): Promise<{ data: Tour[]; total: number }> {
    const [data, total] = await this.toursRepository.findAndCount({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findNewTours(): Promise<Tour[]> {
    return this.toursRepository.find({
      where: { isActive: true, isNew: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Tour> {
    const tour = await this.toursRepository.findOne({
      where: { id, isActive: true },
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
    return tour;
  }

  async create(tourData: Partial<Tour>): Promise<Tour> {
    const tour = this.toursRepository.create(tourData);
    return this.toursRepository.save(tour);
  }

  async update(id: number, tourData: Partial<Tour>): Promise<Tour> {
    const tour = await this.findOne(id);
    Object.assign(tour, tourData);
    return this.toursRepository.save(tour);
  }

  async remove(id: number): Promise<void> {
    const tour = await this.findOne(id);
    tour.isActive = false;
    await this.toursRepository.save(tour);
  }
} 