import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  duration: number; // in days

  @Column('simple-array')
  images: string[];

  @Column({ type: 'nvarchar', length: 255 })
  location: string;

  @Column('nvarchar', { length: 255, nullable: true })
  title: string;

  @Column('simple-array', { nullable: true })
  highlights: string[];

  @Column('simple-array', { nullable: true })
  included: string[];

  @Column('simple-array', { nullable: true })
  excluded: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isNew: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 