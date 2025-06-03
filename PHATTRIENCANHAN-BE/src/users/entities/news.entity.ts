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
  mainImage: string; // Ảnh chính

  @Column({ type: 'text', nullable: true })
  images: string; // Chuỗi, FE sẽ split(',')

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  tags: string; // Chuỗi, FE sẽ split(',')

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
