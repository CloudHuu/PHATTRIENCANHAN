import { Controller, Post, Body, HttpCode, HttpStatus, Patch, UseGuards, Req, Get, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { File } from 'multer'; // Import File type from multer

// Configure storage for uploaded files (Moved from UsersController)
// const storage = diskStorage({
//   destination: './uploads/avatars', // Directory to save the uploaded files (create this folder)
//   filename: (req, file, cb) => {
//     const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
//     return cb(null, `${randomName}${extname(file.originalname)}`); // Generate a unique filename
//   },
// });

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateProfile(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user!.userId;
    return this.authService.updateProfile(userId, updateProfileDto);
  }

  // Endpoint to get authenticated user's full profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    const userId = req.user!.userId;
    // Fetch the full user object from the database using the new findOneById method
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      // This case should ideally not happen if JwtAuthGuard works correctly
      // but good practice to handle
      throw new NotFoundException('User not found');
    }

    // Exclude sensitive data like password before returning
    const { password, ...result } = user;
    return result; // Return the full user profile (excluding password)
  }

  // Endpoint for authenticated users to upload their avatar (Moved from UsersController)
  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar') // Changed path to auth/upload-avatar
  @UseInterceptors(FileInterceptor('avatar')) // 'avatar' is the field name for the file in the form-data - Removed storage config here
  async uploadAvatar(@Req() req: Request, @UploadedFile() file: File) {
    console.log('Received file object:', file); // Add this line
    const userId = req.user!.userId; // Get user ID from token
    const avatarUrl = `/uploads/avatars/${file.filename}`; // Construct URL/path to the saved file

    // Update the user's image field in the database
    await this.usersService.update(userId, { image: avatarUrl }); // Call update with user ID and image URL

    return { avatarUrl }; // Return the URL of the saved avatar
  }
} 