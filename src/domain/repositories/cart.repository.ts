import { ICart } from '../entities/cart.entity';

export enum ACTIONS {
  Add = 'add',
  Reduce = 'reduce',
  Remove = 'remove',
}

export default interface CartRepository {
  getCart(token: string | null): Promise<ICart>;

  addProductToCart(
    productId: string,
    quantity: number,
    token: string | null
  ): Promise<void>;

  removeFromTheCart(productId: string, token: string | null): Promise<void>;

  updateProductCart(
    productId: string,
    quantity: number,
    action: ACTIONS,
    token: string | null
  ): Promise<void>;
}
