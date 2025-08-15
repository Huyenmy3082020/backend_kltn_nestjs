import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductQueryDTO } from './product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll(query: ProductQueryDTO) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    let qb = Product.createQueryBuilder('product');

    if (query.keyword) {
      qb = qb.where(
        'product.name LIKE :keyword OR product.description LIKE :keyword',
        { keyword: `%${query.keyword}%` },
      );
    }

    if (query.orderBy) {
      qb = qb.orderBy(`product.${query.orderBy}`, query.orderType || 'ASC');
    }

    qb = qb.skip(skip).take(limit);

    return qb.getManyAndCount();
  }

  async create(createProduct: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(createProduct);
    return this.productRepository.save(product);
  }
  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
  async update(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async remove(product: Product): Promise<void> {
    await this.productRepository.remove(product);
  }
}
