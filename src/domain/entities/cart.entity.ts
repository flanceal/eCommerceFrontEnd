// Define interfaces for the API response structure

import IProduct from './product.entity';

export interface ICartItem {
  cartId: string;
  productId: string;
  quantity: number;
  product: IProduct;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
}
