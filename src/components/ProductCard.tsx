import React from 'react';
import ProductCardProps from '../types/ProductCardProps';

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  photoUrl,
}) => {
  return (
    <div
      className={
        'flex flex-col gap-3 hover:cursor-pointer hover:scale-105 transition-all duration-200 border-neutral-200 ' +
        'w-44 h:64 sm:w-52 sm:h-72 lg:w-64 lg:h-80 border-2 p-6 rounded-md shadow-xl '
      }
    >
      <div className={'w-full p-3'}>
        <img
          src={photoUrl}
          alt={`Image of ${title}`}
          className={'w-full object-contain h-20 sm:h-24 lg:h-32'}
        />
      </div>
      <h3
        className={
          'font-medium text-xl max-h-14 text-ellipsis overflow-hidden line-clamp-2 hover:text-indigo-800'
        }
      >
        {title.length >= 30 ? `${title.slice(0, 30)}` : title}
      </h3>
      <h4 className={'font-medium text-neutral-400 mt-auto'}>{price}$</h4>
    </div>
  );
};
