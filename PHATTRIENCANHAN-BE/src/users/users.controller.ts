import { Controller, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This endpoint is for updating a user by ID (by an admin)
  // Requires both JWT Authentication and Admin role
  @UseGuards(JwtAuthGuard, AdminGuard) // Apply both guards
  @Patch(':id')
  async updateUserByAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10);
    // Validate if id is a valid number
    if (isNaN(userId)) {
       throw new Error('Invalid user ID provided in URL parameter.');
    }
    // Call the usersService update method with ID from URL and data from body
    return this.usersService.update(userId, updateUserDto);
  }

  // The endpoint for authenticated users to upload their avatar is now in AuthController (POST /auth/upload-avatar).
  // The endpoint for users to update their OWN profile (excluding avatar upload) is in AuthController (PATCH /auth/update).
} 