import { Injectable, Query } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import {
  ProductDto,
  ProductListDto,
  ProductListDtoGetListResponse,
  ProductResponse,
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
  async UpdateProductService(
    id: string,
    updateProduct: ProductDto,
  ): Promise<ProductResponse> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updateProduct);
    const updatedProduct = await this.productRepository.save(product);
    return {
      success: true,
      message: 'FACILITY.UPDATE_SUCCESS',
      data: updatedProduct as ProductDto,
    };
  }

  async delete(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.remove(product);
    return {
      success: true,
      message: 'PRODUCT.DELETE_SUCCESS',
    };
  }
}
