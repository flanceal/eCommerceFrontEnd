import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ACTIONS } from '../domain/repositories/cart.repository.js';
import useAddToCartMutation from '../presentation/hooks/useAddToCartMutation.js';
import { useAuthToken } from '../presentation/hooks/useAuthToken.js';
import useFetchProduct from '../presentation/hooks/useFetchProduct.js';
import ProductDetailsProps from '../types/ProductDetailsProps.js';
import { Card, CardContent } from './ui/card.js';

export const ProductDetails: React.FC<ProductDetailsProps> = ({}) => {
  const { id } = useParams();
  const { product, error, isLoading } = useFetchProduct(id as string);
  const mutation = useAddToCartMutation();
  const [quantity, setQuantity] = useState(1);
  const token = useAuthToken();

  if (!product) return <div className={'mt-32'}>Loading...</div>;

  return (
    <div className={'flex flex-col lg:flex-row justify-around mt-32 lg:mt-48'}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
        <Carousel className="w-full max-w-60 lg:max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        src={`http://localhost:4000/images/${product.imageUrl}`}
                        alt={`${product.title} image`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className={'flex flex-col gap-4'}>
          <h1 className={'text-2xl font-medium'}>{product.title}</h1>
          <h4 className={'text-1xl text-neutral-500'}>{product.price}$</h4>
          <p
            className={
              'max-w-140 pl-6 italic border-l-4 border-zinc-950 border-banner'
            }
          >
            {product.description}
          </p>
          <div className={'flex gap-8'}>
            <div className={'flex items-center gap-3 text-xl'}>
              <Button
                disabled={quantity + 1 >= 100}
                onClick={() => setQuantity((prev) => Math.min(prev + 1, 99))}
              >
                <PlusIcon />
              </Button>
              <span className={'w-10 text-center custom-number-input'}>
                {quantity}
              </span>
              <Button
                disabled={quantity <= 1}
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                <MinusIcon />
              </Button>
            </div>
            <Button
              onClick={() => {
                mutation.mutate({
                  productId: product.id,
                  quantity: quantity,
                  action: ACTIONS.Add,
                  token: token,
                });
                // addToCart(product, quantity);
                // IMPLEMENT LATER WITH API ENDPOINT
                toast('Added to the cart', {
                  description: 'Visit your cart to see added products',
                });
              }}
              size={'lg'}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
