import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255 })
  title: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  category: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  author: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  mainImage: string;

  @Column({ type: 'text', nullable: true })
  images: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  tags: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}