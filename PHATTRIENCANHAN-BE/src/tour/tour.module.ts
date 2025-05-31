import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { Tour } from '../users/entities/tours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
