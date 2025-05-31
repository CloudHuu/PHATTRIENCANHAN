import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  mainImage: string; // Ảnh chính

  @Column('simple-array', { nullable: true })
  images: string[]; // Ảnh phụ (nếu có)

  @Column()
  category: string; // Ví dụ: 'travel' | 'culture' | 'food' | 'events'

  @Column()
  author: string; // Có thể là ID của User

  @Column()
  date: Date;

  @Column({ default: 0 })
  views: number;

  @Column('text')
  description: string; // Tóm tắt ngắn

  @Column('simple-array', { nullable: true })
  tags: string[]; // Các tag liên quan

  // Quan hệ Related News sẽ được quản lý bởi entity RelatedNews

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}