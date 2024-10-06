import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import IProduct from '../types/product.types.js';
import ProductDetailsProps from '../types/ProductDetailsProps.js';
import { Card, CardContent } from './ui/card.js';

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  addToCart,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length <= 2 || value === '') {
      setQuantity(parseInt(value));
    }
  }

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [id]);

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
                      <img src={product.image} alt={`${product.name} image`} />
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
                addToCart(product, quantity);
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
