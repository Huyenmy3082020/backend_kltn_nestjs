import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UserStatus } from './user.entity';
import { RoleGroup } from '../roles/role.entity';
import { Transform } from 'class-transformer';
import { CommonResponse, PaginateResponse } from '../../base/common.response';

class UserDto {
  @ApiProperty({
    type: String,
    example: '123',
    required: true,
  })
  id: string;
  @ApiProperty({
    type: String,
    example: 'john_doe',
    required: true,
  })
  username: string;
  @ApiProperty({
    type: String,
    example: 'john@example.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: false,
  })
  fullname?: string | null;
  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string | null;
  @ApiProperty({
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  lastLogin?: Date | null;
  @ApiProperty({
    type: String,
    example: 'ACTIVE',
    required: true,
  })
  status: string; // UserStatus
  @ApiProperty({
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  lockTime?: Date | null;
  @ApiProperty({
    type: Number,
    example: 0,
    required: true,
  })
  lockCount: number;

  @ApiProperty({
    type: String,
    example: 'organization-id-123',
    description: 'Organization ID that the user belongs to',
    required: true,
  })
  organizationId: string;

  @ApiProperty({
    type: String,
    example: 'ORGANIZATION',
    description: 'Highest privilege role group of the user',
    required: false,
  })
  userGroup?: string;
}

class UserCreateDto {
  @ApiProperty({
    type: String,
    example: 'john@example.com',
    description: 'Email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Full name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullname?: string | null;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string | null;

  // @ApiProperty({
  //   enum: UserStatus,
  //   example: UserStatus.CREATED,
  //   description: 'Status of the user',
  //   required: false,
  // })
  // @IsEnum(UserStatus)
  // @IsOptional()
  // status?: UserStatus;

  @ApiProperty({
    type: String,
    example: 'organization-id-123',
    description: 'Organization ID that the user belongs to',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    type: [String],
    example: ['HAUDI_ADMIN', 'ORGANIZATION_ADMIN', 'OPERATOR'],
    description:
      'Array of role IDs to assign to the user. Role 2=HAUDI_ADMIN  , 3=ORGANIZATION_ADMIN, 4=OPERATOR. First role will be used for Cognito group assignment.',
    required: false,
  })
  @IsOptional()
  roleIds?: string[];

  @ApiProperty({
    type: [String],
    example: ['facility-id-1', 'facility-id-2'],
    description: 'Array of facility IDs to assign to the user',
    required: false,
  })
  @IsOptional()
  facilityIds?: string[];
}

class UserUpdateDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Full name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullname?: string | null;

  @ApiProperty({
    type: String,
    example: 'avatar.jpg',
    description: 'Avatar URL of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string | null;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: 'Status of the user',
    required: false,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiProperty({
    type: String,
    example: 'organization-id-123',
    description: 'Organization ID that the user belongs to',
    required: false,
  })
  @IsString()
  @IsOptional()
  organizationId?: string;

  @ApiProperty({
    type: [String],
    example: ['HAUDI_ADMIN', 'ORGANIZATION_ADMIN', 'OPERATOR'],
    description:
      'Array of role IDs to assign to the user. First role will be used for Cognito group assignment.',
    required: false,
  })
  @IsOptional()
  roleIds?: string[];

  @ApiProperty({
    type: [String],
    example: ['facility-id-1', 'facility-id-2'],
    description: 'Array of facility IDs to assign to the user',
    required: false,
  })
  @IsOptional()
  facilityIds?: string[];
}

class UserGetListDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Page number for pagination',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Number of items per page for pagination',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 10;

  @ApiProperty({
    type: String,
    example: 'john',
    description: 'Search term for username or email',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: 'Filter by user status',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiProperty({
    type: String,
    example: 'admin',
    description: 'Filter by role ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  roleId?: string;

  @ApiProperty({
    enum: RoleGroup,
    example: RoleGroup.ORGANIZATION,
    description: 'Filter by role group (HAUDI, ORGANIZATION, FACILITY)',
    required: false,
  })
  @IsOptional()
  @IsEnum(RoleGroup)
  roleGroup?: RoleGroup;

  @ApiProperty({
    type: String,
    example: 'facility-uuid-123',
    description: 'Filter by facility ID or "ALL" for global settings',
    required: false,
  })
  @IsOptional()
  @IsString()
  facilityId?: string;

  @ApiProperty({
    type: String,
    example: 'organization-uuid-123',
    description: 'Filter by organization ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  organizationId?: string;
}

class UserResponse extends CommonResponse<UserDto> {
  @ApiProperty({
    type: UserDto,
    description: 'User details',
  })
  declare data: UserDto;
}

class UserDeleteResponse extends CommonResponse<boolean> {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the user was deleted successfully',
  })
  declare data: boolean;
}

class UserGetListResponse extends PaginateResponse<UserDto> {}

class ChangePasswordDto {
  @ApiProperty({
    type: String,
    example: 'currentPassword123',
    description: 'Current password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: 'newPassword123',
    description: 'New password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

class ForceChangePasswordDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'User email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'newPassword123',
    description: 'New password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'Remember me option',
    required: false,
  })
  @IsOptional()
  rememberMe?: boolean;
}

class ChangePasswordResponse extends CommonResponse<boolean> {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if password change was successful',
  })
  declare data: boolean;
}

class ForceChangePasswordResponse extends CommonResponse<{
  success: boolean;
  accessToken: string;
  idToken: string;
  expiresIn: number;
  refreshToken: string;
  user: UserDto;
}> {
  @ApiProperty({
    type: Object,
    description: 'Authentication result after force password change',
  })
  declare data: {
    success: boolean;
    accessToken: string;
    idToken: string;
    expiresIn: number;
    refreshToken: string;
    user: UserDto;
  };
}

export {
  UserDto,
  UserCreateDto,
  UserUpdateDto,
  UserGetListDto,
  UserDeleteResponse,
  UserResponse,
  UserGetListResponse,
  ChangePasswordDto,
  ForceChangePasswordDto,
  ChangePasswordResponse,
  ForceChangePasswordResponse,
};
