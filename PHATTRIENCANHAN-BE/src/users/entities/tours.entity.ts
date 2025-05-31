import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  duration: string;

  @Column()
  location: string;

  @Column()
  mainImage: string;

  @Column('simple-array')
  images: string[];

  @Column()
  category: string;

  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviews: number;

  @Column('simple-array')
  highlights: string[];

  @Column('nvarchar', { length: 'max' })
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];

  @Column('nvarchar', { length: 'max' })
  pricing: {
    includes: string[];
    excludes: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}