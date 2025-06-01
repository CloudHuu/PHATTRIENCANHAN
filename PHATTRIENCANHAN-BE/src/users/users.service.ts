import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { MoreThan } from 'typeorm';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Combine firstName and lastName to create fullName
    const fullName = `${registerDto.firstName} ${registerDto.lastName}`.trim();

    const user = this.usersRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      fullName: fullName,
      phone: registerDto.phoneNumber, // Assuming phoneNumber is in registerDto
      // Add other fields if necessary
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // New method to find user by ID
  async findOneById(userId: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: userId },
      select: [
        'id', 'email', 'fullName', 'phone', 'gender', 'dateOfBirth', 'image', // Explicitly select essential fields including image
        'resetPasswordToken', 'resetPasswordExpires', // Include password reset fields
        // Add other fields here if necessary
      ],
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(`Attempting to update user with ID: ${userId}`);
    console.log('Update data:', updateUserDto);

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Destructure dateOfBirth separately
    const { dateOfBirth, ...otherUpdateData } = updateUserDto;

    // Handle dateOfBirth string to Date object conversion and validation
    if (dateOfBirth !== undefined) {
      if (dateOfBirth === null || dateOfBirth.trim() === '') {
        // Set to null if the client explicitly sends null or empty string
        user.dateOfBirth = null; // This is now allowed due to nullable: true in entity
      } else {
        // Attempt to parse date string in YYYY-MM-DD format
        const parts = dateOfBirth.split('-');
        // Ensure we have three parts and they are numbers
        if (parts.length === 3 && !isNaN(parseInt(parts[0])) && !isNaN(parseInt(parts[1])) && !isNaN(parseInt(parts[2]))) {
          // Create Date object using UTC to avoid timezone issues affecting the date itself
          // Month is 0-indexed in Date constructor
          const year = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1;
          const day = parseInt(parts[2]);
          const date = new Date(Date.UTC(year, month, day));

          // Check if the created date components match the input components
          // This helps validate if the date string was valid (e.g., handles invalid month/day like 2000-02-30)
          if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
             throw new BadRequestException('Invalid date value for dateOfBirth. Please use YYYY-MM-DD format with valid date components.');
          }

          // Assign the valid Date object
          user.dateOfBirth = date;

        } else {
           // If parsing failed or format is incorrect
           throw new BadRequestException('Invalid date format for dateOfBirth. Expected YYYY-MM-DD.');
        }
      }
    }

    // Update other user properties from the DTO
    Object.assign(user, otherUpdateData);

    const savedUser = await this.usersRepository.save(user);
    console.log('User saved successfully:', savedUser);
    return savedUser;
  }

  async updateResetPasswordToken(email: string, token: string, expires: Date): Promise<void> {
    await this.usersRepository.update(
      { email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.update(
      { id: user.id },
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      },
    );
  }
} 