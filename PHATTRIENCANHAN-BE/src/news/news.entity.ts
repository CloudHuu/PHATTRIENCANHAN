import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news') // Table name in the database
export class News {
  @PrimaryGeneratedColumn() // Or @PrimaryColumn() with string/uuid type
  id: number; // Or string/uuid

  @Column({ type: 'nvarchar', length: 255 })
  title: string;

  @Column({ type: 'nvarchar', length: 255 })
  category: string; // travel, culture, food, events, etc.

  @Column({ type: 'datetime2' }) // Store as datetime
  date: Date; // Or appropriate date/time type for your DB

  @Column({ type: 'nvarchar', length: 255 })
  author: string;

  @Column({ default: 0 })
  views: number; // Default 0 views when created

  @Column({ type: 'nvarchar', length: 255 })
  image: string; // Path or URL of the image

  @Column('text') // Text type for longer content
  description: string; // Used for the list page

  @Column('text') // Text type for very long content (can contain HTML)
  content: string; // Used for the detail page

  // Other management fields (optional but recommended)
  @Column({ default: true })
  isActive: boolean; // Display status

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relatedNews doesn't need to be a column in the main entity
  // It will be handled by logic in the Service/Controller to return related data when needed
} 