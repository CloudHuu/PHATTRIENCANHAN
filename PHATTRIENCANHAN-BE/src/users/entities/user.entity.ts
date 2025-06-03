import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  image: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth: Date | null;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true, type: 'datetime2' })
  resetPasswordExpires: Date | null;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  mainImage: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

