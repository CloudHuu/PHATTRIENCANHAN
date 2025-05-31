import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Tour } from './tours.entity';

@Entity('related_tours')
export class RelatedTour {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour)
  @JoinColumn({ name: 'tourId' }) // Tên cột foreign key trong bảng related_tours
  tour: Tour;

  @Column() // Cột lưu ID của tour chính
  tourId: number;

  @ManyToOne(() => Tour)
  @JoinColumn({ name: 'relatedTourId' }) // Tên cột foreign key cho tour liên quan
  relatedTour: Tour;

   @Column() // Cột lưu ID của tour liên quan
  relatedTourId: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}