import { Token } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { ACTIONS } from '../../domain/repositories/cart.repository';
import { CartServiceContext } from '../context/cart.service.provider';
import { useAuthToken } from './useAuthToken';

export interface IChangeProduct {
  productId: string;
  quantity: number;
  action: ACTIONS;
}

const useUpdateProductQuantity = () => {
  const cartService = useContext(CartServiceContext);
  const queryClient = useQueryClient();
  const token = useAuthToken();

  const changeProductInCart = async ({
    productId,
    quantity,
    action,
  }: IChangeProduct) => {
    return await cartService.updateProductCart(
      productId,
      quantity,
      action,
      token
    );
  };

  const mutation = useMutation({
    mutationFn: changeProductInCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`cart_${token}`] });
    },
  });

  return mutation;
};

export default useUpdateProductQuantity;
