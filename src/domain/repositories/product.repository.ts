import IProduct from '../entities/product.entity';

export default interface ProductRepository {
  getProducts(): Promise<IProduct[]>;

  getProduct(productId: string, token: string | null): Promise<IProduct>;
}
