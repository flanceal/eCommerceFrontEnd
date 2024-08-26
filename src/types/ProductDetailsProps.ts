import IProduct from './product.types';

export default interface ProductDetailsProps {
  addToCart: (product: IProduct, amount: number) => void;
}
