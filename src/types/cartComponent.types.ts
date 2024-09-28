import ICart from './cart.types';
import IProduct from './product.types';

export default interface ICartComponent {
  cart: ICart[];
  removeFromCart: (productId: string) => void;
  increaseProductAmount: (product: IProduct) => void;
  decreaseProductAmount: (product: IProduct) => void;
}
