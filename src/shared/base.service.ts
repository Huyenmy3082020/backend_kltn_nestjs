import { Injectable } from '@nestjs/common';
import { ResponseHelper } from './response.helper';
import { CommonResponse, PaginateResponse } from 'src/base/common.response';

/**
 * Base service class providing common response utilities
 */

@Injectable()
export abstract class BaseService {
  /**
   * Create a success response with data
   */
  protected success<T>(data: T, message: string): CommonResponse<T> {
    return ResponseHelper.success(data, message);
  }

  /**
   * Create a paginated response
   */
  protected paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string,
  ): PaginateResponse<T> {
    return ResponseHelper.paginate(data, total, page, limit, message);
  }

  protected error(message: string): CommonResponse<null> {
    return ResponseHelper.error(message);
  }
}
