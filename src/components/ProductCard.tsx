import React from 'react';
import ProductCardProps from '../types/ProductCardProps';
import { Card, CardDescription, CardTitle } from './ui/card';

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  photoUrl,
}) => {
  return (
    <Card className="p-4 flex flex-col h-80 justify-between">
      <div className="w-full p-3 flex justify-center">
        <img
          src={photoUrl}
          alt={`Image of ${title}`}
          className="w-auto h-32 object-contain"
        />
      </div>
      <CardTitle className="font-medium text-base h-12 text-ellipsis overflow-hidden line-clamp-2 mb-2">
        {title}
      </CardTitle>
      <CardDescription>{price}$</CardDescription>
    </Card>
  );
};
