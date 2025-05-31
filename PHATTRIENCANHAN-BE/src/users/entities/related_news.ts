import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { News } from './news.entity';

@Entity('related_news')
export class RelatedNews {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => News)
  @JoinColumn({ name: 'newsId' }) // Tên cột foreign key trong bảng related_news
  news: News;

  @Column() // Cột lưu ID của bài viết tin tức chính
  newsId: number;

  @ManyToOne(() => News)
  @JoinColumn({ name: 'relatedNewsId' }) // Tên cột foreign key cho tin tức liên quan
  relatedNews: News;

  @Column() // Cột lưu ID của bài viết tin tức liên quan
  relatedNewsId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}