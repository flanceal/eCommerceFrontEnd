import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ProductServiceContext } from '../context/product.service.provider';

const useFetchProducts = () => {
  const productService = useContext(ProductServiceContext);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`products`],
    queryFn: () => productService.getProducts(),
  });

  return {
    products,
    error,
    isLoading,
  };
};

export default useFetchProducts;
