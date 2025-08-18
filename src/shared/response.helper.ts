import { CommonResponse, PaginateResponse } from '../base/common.response';

export class ResponseHelper {
  /**
   * Create a success response with data
   */
  static success<T>(data: T, message: string): CommonResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  /**
   * Create a paginated response
   */
  static paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string,
  ): PaginateResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      message,
      data,
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  static error(message: string): CommonResponse<null> {
    return {
      success: false,
      message,
      data: null,
    };
  }
}
