import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpStatus,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ProductDto,
  ProductListDto,
  ProductListDtoGetListResponse,
  ProductQueryDTO,
  UpdateProductDto,
} from './product.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/base/common.response';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  async getProducts(
    @Query() query: ProductQueryDTO,
  ): Promise<ProductListDtoGetListResponse> {
    return this.productService.findAll(query);
  }
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new product',
    type: ProductDto, // DTO phản hồi sau khi tạo sản phẩm
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Resource not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    type: ErrorResponse,
  })
  @ApiOperation({
    operationId: 'createProduct',
    description: 'Create a new product',
  })
  @Post()
  async createProduct(@Body() createProduct: ProductDto) {
    return this.productService.create(createProduct);
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update a product',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
    type: ErrorResponse,
  })
  @ApiOperation({
    operationId: 'updateProduct',
    description: 'Update an existing product',
  })
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.productService.UpdateProductService(id, updateProduct);
  }

  // DELETE /products/:id
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete a product',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
    type: ErrorResponse,
  })
  @ApiOperation({
    operationId: 'deleteProduct',
    description: 'Delete a product by id',
  })
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
