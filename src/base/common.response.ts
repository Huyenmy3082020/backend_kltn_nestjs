import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponse<T> {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: String,
    example: 'Data retrieved successfully',
  })
  message: string;
  @ApiProperty({
    type: Number,
    example: 1,
  })
  currentPage?: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  totalPages?: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  totalItems?: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  itemsPerPage?: number;

  @ApiProperty({
    type: [Object],
    isArray: true,
    description: 'Array of items',
  })
  data: T[];
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  hasNextPage?: boolean;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  hasPreviousPage?: boolean;
}

export class CommonResponse<T> {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: String,
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    type: Object,
    description: 'Data returned from the operation',
  })
  data: T;
}

class DataError {
  @ApiProperty({
    type: String,
    example: 'ERR001',
    description: 'Error code for the specific error',
  })
  errorCode: string;

  @ApiProperty({
    type: String,
    example: 'Detailed error message',
    description: 'Additional details about the error',
    required: false,
  })
  details?: string;
}

export class ErrorResponse {
  @ApiProperty({
    type: Boolean,
    example: false,
  })
  success: boolean;

  @ApiProperty({
    type: String,
    example: 'An error occurred',
  })
  message: string;

  @ApiProperty({
    type: DataError,
    description: 'Error details',
  })
  data?: DataError;

  @ApiProperty({
    type: String,
    example: '2023-10-01T12:00:00Z',
  })
  timestamp?: string;

  @ApiProperty({
    type: String,
    example: '/api/v1/resource',
  })
  path?: string;
}

export class SuccessResponse {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  status: boolean;

  @ApiProperty({
    type: String,
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    type: Object,
    example: {},
    description: 'Data returned from the operation',
  })
  data?: any;
}
