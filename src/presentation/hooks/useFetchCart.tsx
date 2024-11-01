import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ICart } from '../../domain/entities/cart.entity';
import { CartServiceContext } from '../context/cart.service.provider';
import { useAuthToken } from './useAuthToken';

const useFetchCart = () => {
  const cartService = useContext(CartServiceContext);
  const token = useAuthToken();

  const {
    data: cart = {} as ICart,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`cart_${token}`],
    queryFn: () => cartService.getCart(token),
    enabled: !!token,
  });

  return {
    cart,
    error,
    isLoading,
  };
};

export default useFetchCart;
