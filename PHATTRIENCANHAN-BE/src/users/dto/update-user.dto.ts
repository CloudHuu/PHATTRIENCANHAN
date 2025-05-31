import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  gender?: string; // Có thể là 'male', 'female', 'other'

  @IsOptional()
  @IsString()
  image?: string; // URL hoặc đường dẫn ảnh

  @IsOptional()
  @IsString()
  phone?: string; // Có thể cập nhật số điện thoại

  @IsOptional()
  @IsDateString() // Sử dụng IsDateString để validate chuỗi ngày tháng
  dateOfBirth?: string; // Ngày sinh dưới dạng chuỗi (ví dụ: YYYY-MM-DD)
} 