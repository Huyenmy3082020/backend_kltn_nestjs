import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ProductDto,
  ProductListDto,
  ProductListDtoGetListResponse,
  ProductQueryDTO,
} from './product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query() query: ProductQueryDTO,
  ): Promise<ProductListDtoGetListResponse> {
    return this.productService.findAll(query);
  }

  @Post()
  async createProduct(@Body() createProduct: ProductDto) {
    return this.productService.create(createProduct);
  }
}
