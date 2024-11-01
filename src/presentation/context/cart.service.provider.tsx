import axios from 'axios';
import React, { createContext, PropsWithChildren } from 'react';
import CartService from '../../application/services/cart.service';
import ProductService from '../../application/services/product.service';
import CartHttpAdapter from '../../infrastructure/http/adapters/cart.adapter';

const cartHttpAdapter = new CartHttpAdapter(
  'http://localhost:8080/api/v1/cart',
  axios
);

export const CartServiceContext = createContext<CartService>(
  new CartService(cartHttpAdapter)
);

type Props = {
  service: CartService;
};

export const CartServiceProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  service,
}) => {
  return (
    <CartServiceContext.Provider value={service}>
      {children}
    </CartServiceContext.Provider>
  );
};
