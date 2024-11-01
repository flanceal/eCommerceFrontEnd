import { ICart } from '../../domain/entities/cart.entity';
import CartRepository, {
  ACTIONS,
} from '../../domain/repositories/cart.repository';

export default class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCart(token: string | null): Promise<ICart> {
    return await this.cartRepository.getCart(token);
  }

  async addProductToCart(
    productId: string,
    quantity: number,
    token: string | null
  ): Promise<void> {
    return await this.cartRepository.addProductToCart(
      productId,
      quantity,
      token
    );
  }

  async removeFromTheCart(
    productId: string,
    token: string | null
  ): Promise<void> {
    return await this.cartRepository.removeFromTheCart(productId, token);
  }

  async updateProductCart(
    productId: string,
    quantity: number,
    action: ACTIONS,
    token: string | null
  ): Promise<void> {
    return await this.cartRepository.updateProductCart(
      productId,
      quantity,
      action,
      token
    );
  }
}
