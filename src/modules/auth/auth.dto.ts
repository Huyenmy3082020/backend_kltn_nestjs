import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../users/user.entity';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsOptional()
  @IsString()
  username?: string;
}
export class UserResponseDto {
  @ApiProperty({ description: 'Firebase UID của user' })
  uid: string;

  @ApiProperty({ description: 'Tên đăng nhập của user' })
  username: string;

  @ApiProperty({ description: 'Email của user' })
  email: string;

  @ApiProperty({ description: 'Họ và tên đầy đủ của user', required: false })
  fullname?: string;

  @ApiProperty({ description: 'Avatar của user', required: false })
  avatar?: string;

  @ApiProperty({ description: 'Trạng thái user', enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ description: 'Token đăng nhập (nếu có)', required: false })
  token?: string;
}
