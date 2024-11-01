import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICartItem } from '../domain/entities/cart.entity';
import { ACTIONS } from '../domain/repositories/cart.repository';
import useAddToCartMutation from '../presentation/hooks/useAddToCartMutation';
import { useAuthToken } from '../presentation/hooks/useAuthToken';
import useFetchCart from '../presentation/hooks/useFetchCart';
import useUpdateProductQuantity from '../presentation/hooks/useUpdateProductQuantity';

export const Cart: React.FC = () => {
  const { cart, error, isLoading } = useFetchCart();
  const changeMutation = useUpdateProductQuantity();
  const addMutation = useAddToCartMutation();

  const token = useAuthToken();

  if (!token) {
    return <h1>Sing up/in if you want to see your cart</h1>;
  }

  function formatNumber(value: number, decimals: number) {
    return Number(value.toFixed(decimals));
  }

  const changeProductQuantity = (
    productId: string,
    quantity: number,
    action: ACTIONS,
    token: string
  ) => {
    changeMutation.mutate({
      productId,
      quantity,
      action,
    });
  };

  // if (isLoading) {
  //   return <h1>Is loading</h1>;
  // }

  if (!cart || error) {
    return <h1>Error: ${error?.message}</h1>;
  }

  const items = cart?.items;

  if (!items) {
    return <h1>No items</h1>;
  }

  const totalSum = items.reduce((acc: number, item: ICartItem) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className={'font-medium text-3xl mb-20'}>Your Cart</h1>
      <div className="overflow-x-auto w-full">
        {items ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow key={'header'}>
                  <TableHead key={'product'}>Product</TableHead>
                  <TableHead key={'price'}>Price</TableHead>
                  <TableHead key={'quantity'}>Quantity</TableHead>
                  <TableHead key={'total'}>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: ICartItem) => (
                  <TableRow key={item.productId}>
                    <TableCell key={'product'}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <div className="w-16 h-16 p-2 sm:w-20 sm:h-20 border-2 border-zinc-950 rounded-xl overflow-hidden">
                          <img
                            src={`http://localhost:4000/images/${item.product.imageUrl}`}
                            alt={`${item.product.title} image`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="hover:text-indigo-700">
                          <Link
                            to={`/products/${item.productId}`}
                          >{`${item.product.title.slice(0, 12)}...`}</Link>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell key={'price'}>{item.product.price}</TableCell>
                    <TableCell key={'amount'}>
                      <div className={'flex gap-2 items-center'}>
                        <Button
                          className="text-white"
                          onClick={() => {
                            addMutation.mutate({
                              productId: item.productId,
                              quantity: 1,
                            });
                          }}
                          disabled={item.quantity + 1 >= 100}
                        >
                          +
                        </Button>
                        {item.quantity}
                        <Button
                          className="text-white"
                          onClick={() =>
                            changeProductQuantity(
                              item.productId,
                              1,
                              ACTIONS.Reduce,
                              token
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell key={'total'}>
                      {formatNumber(item.quantity * item.product.price, 2)}$
                    </TableCell>
                    <TableCell key={'remove-btn'}>
                      <Button
                        onClick={() =>
                          changeProductQuantity(
                            item.productId,
                            0,
                            ACTIONS.Remove,
                            token
                          )
                        }
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className={'flex flex-col gap-10 items-center w-full'}>
            <h2 className={'font-medium text-2xl'}>Your cart is empty</h2>
            <Link to={'/products'}>
              <Button>Start shopping</Button>
            </Link>
          </div>
        )}
      </div>
      <div
        className={
          'flex flex-col gap-3 mt-16 self-end w-full lg:w-auto items-center'
        }
      >
        <p>{formatNumber(totalSum, 2)}$</p>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};
