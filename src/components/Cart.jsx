import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useState } from 'react';

export function Cart({
  cart,
  removeFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
}) {
  const totalSum = cart.reduce((acc, item) => {
    acc += item.price * item.quantity;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className={'font-medium text-3xl mb-20'}>Your Cart</h1>
      <div className="overflow-x-auto w-full">
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
            {cart.map((item) => (
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
                    <p className="hover:text-slate-700">
                      <Link
                        to={`/products/${item.id}`}
                      >{`${item.title.slice(0, 12)}...`}</Link>
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                  {item.price}$
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                  <div className={'flex gap-1 items-center'}>
                    <button
                      className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${item.quantity + 1 >= 100 && 'bg-neutral-200'}`}
                      onClick={() => increaseProductQuantity(item)}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${item.quantity + 1 >= 100 && 'bg-neutral-200'}`}
                      onClick={() => decreaseProductQuantity(item)}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="px-2 py-2 sm:px-4 sm:py-2 text-xs sm:text-base">
                  <div className={'flex gap-1 items-center w-full'}>
                    <span>{item.quantity * item.price}$</span>
                    <button
                      className={'py-2 px-3 bg-banner rounded-2xl ml-auto'}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>{totalSum}</h4>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  increaseProductQuantity: PropTypes.func.isRequired,
  decreaseProductQuantity: PropTypes.func.isRequired,
};
