import { Injectable, Query } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import {
  ProductDto,
  ProductListDto,
  ProductListDtoGetListResponse,
} from './product.dto';
import { BaseService } from 'src/shared/base.service';

@Injectable()
export class ProductService extends BaseService {
  constructor(private readonly productRepository: ProductRepository) {
    super();
  }
  async findAll(query): Promise<ProductListDtoGetListResponse> {
    const [products, total] = await this.productRepository.findAll(query);

    return this.paginate<ProductListDto>(
      products,
      total,
      query.page || 1,
      query.limit || 10,
      'PRODUCTS.RETRIEVED_SUCCESS',
    );
  }

  async create(createProduct: ProductDto): Promise<Product> {
    return this.productRepository.create(createProduct);
  }
}
