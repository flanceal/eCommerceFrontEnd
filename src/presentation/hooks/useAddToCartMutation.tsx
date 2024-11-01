import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { CartServiceContext } from '../context/cart.service.provider';
import { useAuthToken } from './useAuthToken';

export interface ChangeProduct {
  productId: string;
  quantity: number;
}

const useAddToCartMutation = () => {
  const cartService = useContext(CartServiceContext);
  const queryClient = useQueryClient();
  const token = useAuthToken();

  const addProductToCart = async ({
    productId,
    quantity,
  }: ChangeProduct): Promise<void> => {
    await cartService.addProductToCart(productId, quantity, token);
  };

  const mutation = useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`cart_${token}`] });
    },
  });

  return mutation;
};

export default useAddToCartMutation;
