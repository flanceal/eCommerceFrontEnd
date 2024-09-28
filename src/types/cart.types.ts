import IProduct from './product.types';

export default interface ICart extends IProduct {
  amount: number;
}
