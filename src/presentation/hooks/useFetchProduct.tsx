import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ProductServiceContext } from '../context/product.service.provider';
import { useAuthToken } from './useAuthToken';

const useFetchProduct = (productId: string) => {
  const productService = useContext(ProductServiceContext);
  const token = useAuthToken();

  console.log(token);
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`product_${productId}`],
    queryFn: () => productService.getProduct(productId, token),
    enabled: !!token,
  });

  return {
    product,
    error,
    isLoading,
  };
};

export default useFetchProduct;
