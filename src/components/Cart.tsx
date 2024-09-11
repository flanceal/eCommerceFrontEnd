import React from 'react';
import { Link } from 'react-router-dom';
import ICart from '../types/cart.types';
import ICartComponent from '../types/cartComponent.types';
import { Button } from './Button';

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
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-base">
                  Product
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-base">
                  Price
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-base">
                  Quantity
                </th>
                <th className="px-2 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-base">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: ICart) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-2 py-2 sm:px-4 sm:py-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <div className="w-16 h-16 p-2 sm:w-20 sm:h-20 border-2 border-neutral-400 rounded-xl overflow-hidden">
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
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                    {formatNumber(item.price, 2)}$
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                    <div className={'flex gap-1 items-center'}>
                      <button
                        className={`px-3 py-1.5 bg-indigo-200 hover:bg-indigo-400 rounded-full ${item.amount + 1 >= 100 && 'bg-neutral-200 hover:bg-neutral-200 '}`}
                        onClick={() => increaseProductAmount(item)}
                        disabled={item.amount + 1 >= 100}
                      >
                        +
                      </button>
                      {item.amount}
                      <button
                        className={`px-3 py-1.5 bg-indigo-200 hover:bg-indigo-400 rounded-full ${item.amount - 1 <= 0 && 'bg-neutral-200 hover:bg-neutral-200'}`}
                        onClick={() => decreaseProductAmount(item)}
                        disabled={item.amount <= 1}
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                    <div className={'flex gap-1 items-center w-full'}>
                      <span>{formatNumber(item.amount * item.price, 2)}$</span>
                      <Button
                        text={'Remove'}
                        handleClick={() => removeFromCart(item.id)}
                        className={'w-fit text-base px-3 ml-auto'}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={'flex flex-col gap-10 items-center w-full'}>
            <h2 className={'font-medium text-2xl'}>Your cart is empty</h2>
            <Link to={'/products'}>
              <button
                className={
                  'px-4 py-2 bg-indigo-200 text-neutral-50 rounded-2xl'
                }
              >
                Start shopping
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className={'flex flex-col mt-16 self-end'}>
        <p>Total: {formatNumber(totalSum, 2)}$</p>
        <Button
          text={'Checkout'}
          className={
            'px-4 py-2 border-2 border-banner bg-indigo-200 text-neutral-50 hover:text-banner hover:bg-neutral-50 transition-all duration-200 rounded-2xl'
          }
        />
      </div>
    </div>
  );
};
