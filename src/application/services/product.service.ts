import IProduct from '../../domain/entities/product.entity';
import ProductRepository from '../../domain/repositories/product.repository';

export default class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProducts(): Promise<IProduct[]> {
    return await this.productRepository.getProducts();
  }

  async getProduct(productId: string, token: string | null): Promise<IProduct> {
    return await this.productRepository.getProduct(productId, token);
  }
}
