import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CommonResponse, PaginateResponse } from '../../base/common.response';

export class ProductDto {
  @ApiProperty({ example: 'Laptop Dell XPS 15', description: 'Tên sản phẩm' })
  name: string;

  @ApiProperty({ example: 3500, description: 'Giá sản phẩm (VNĐ)' })
  price: number;

  @ApiProperty({
    example: 'Laptop cao cấp dành cho lập trình viên',
    description: 'Mô tả sản phẩm',
    required: false,
  })
  description?: string;
}
export class ProductQueryDTO {
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

  @ApiProperty({ example: 'Laptop', required: false })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({
    type: String,
    example: 'ACTIVE',
    required: false,
    description: 'Trạng thái cơ sở (dạng chuỗi)',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ enum: ['ASC', 'DESC'], example: 'ASC', required: false })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderType?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({ example: 'name', required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;
}

export class ProductListDto {
  name: string;
  price: number;
  description?: string;
}

export class ProductListDtoGetListResponse extends PaginateResponse<ProductListDto> {
  @ApiProperty({ type: [ProductListDto] })
  declare data: ProductListDto[];
}
export class UpdateProductDto extends ProductDto {}
export class ProductResponse extends CommonResponse<ProductDto> {
  @ApiProperty({ type: ProductDto })
  declare data: ProductDto;
}
