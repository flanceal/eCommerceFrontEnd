import React from 'react';
import { Link } from 'react-router-dom';
import ICart from '../types/cart.types';
import ICartComponent from '../types/cartComponent.types';
import { CustomButton } from './Button';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Cart: React.FC<ICartComponent> = ({
  cart,
  removeFromCart,
  increaseProductAmount,
  decreaseProductAmount,
}) => {
  function formatNumber(value: number, decimals: number) {
    return Number(value.toFixed(decimals));
  }

  const totalSum = cart.reduce((acc: number, item: ICart) => {
    acc += item.price * item.amount;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className={'font-medium text-3xl mb-20'}>Your Cart</h1>
      <div className="overflow-x-auto w-full">
        {cart.length ? (
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
                {cart.map((item: ICart) => (
                  <TableRow key={item.id}>
                    <TableCell key={'product'}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <div className="w-16 h-16 p-2 sm:w-20 sm:h-20 border-2 border-zinc-950 rounded-xl overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="hover:text-indigo-700">
                          <Link
                            to={`/products/${item.id}`}
                          >{`${item.title.slice(0, 12)}...`}</Link>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell key={'price'}>{item.price}</TableCell>
                    <TableCell key={'amount'}>
                      <div className={'flex gap-2 items-center'}>
                        <Button
                          className="text-white"
                          onClick={() => increaseProductAmount(item)}
                          disabled={item.amount + 1 >= 100}
                        >
                          +
                        </Button>
                        {item.amount}
                        <Button
                          className="text-white"
                          onClick={() => decreaseProductAmount(item)}
                          disabled={item.amount <= 1}
                        >
                          -
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell key={'total'}>
                      {formatNumber(item.amount * item.price, 2)}$
                    </TableCell>
                    <TableCell key={'remove-btn'}>
                      <Button onClick={() => removeFromCart(item.id)}>
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
