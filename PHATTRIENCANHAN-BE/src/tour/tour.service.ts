import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../users/entities/tours.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  create(createTourDto: CreateTourDto) {
    return 'This action adds a new tour';
  }

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
