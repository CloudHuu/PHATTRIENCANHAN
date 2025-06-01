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

  @Column({ type: 'text', transformer: { from: (value) => value ? JSON.parse(value) : [], to: (value) => value ? JSON.stringify(value) : '[]' } })
  images: string[];

  @Column({ type: 'nvarchar', length: 255 })
  location: string;

  @Column('nvarchar', { length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true, transformer: { from: (value) => value ? JSON.parse(value) : [], to: (value) => value ? JSON.stringify(value) : '[]' } })
  highlights: string[];

  @Column({ type: 'text', nullable: true, transformer: { from: (value) => value ? JSON.parse(value) : [], to: (value) => value ? JSON.stringify(value) : '[]' } })
  included: string[];

  @Column({ type: 'text', nullable: true, transformer: { from: (value) => value ? JSON.parse(value) : [], to: (value) => value ? JSON.stringify(value) : '[]' } })
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