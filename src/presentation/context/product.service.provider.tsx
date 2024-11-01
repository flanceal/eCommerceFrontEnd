import axios from 'axios';
import React, { createContext, PropsWithChildren } from 'react';
import ProductService from '../../application/services/product.service';
import ProductHttpAdapter from '../../infrastructure/http/adapters/product.adapter';

const productHttpAdapter = new ProductHttpAdapter(
  'http://localhost:8080/api/v1/products',
  axios
);

export const ProductServiceContext = createContext<ProductService>(
  new ProductService(productHttpAdapter)
);

type Props = {
  service: ProductService;
};

export const ProductServiceProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  service,
}) => {
  return (
    <ProductServiceContext.Provider value={service}>
      {children}
    </ProductServiceContext.Provider>
  );
};
