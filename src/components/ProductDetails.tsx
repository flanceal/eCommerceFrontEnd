import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import IProduct from '../types/product.types.js';
import ProductDetailsProps from '../types/ProductDetailsProps.js';
import { Button } from './Button.js';

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  addToCart,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length <= 2 || value === '') {
      setQuantity(parseInt(value));
    }
  }

  function showNotification() {
    setIsNotificationVisible(true);
    setIsAnimationVisible(true);

    setTimeout(() => {
      setIsAnimationVisible(false);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 300);
    }, 2000);
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

  console.log(quantity);

  return (
    <div className={'flex flex-col lg:flex-row  justify-around mt-32 lg:mt-48'}>
      <Link to={'/cart'}>
        <div
          className={`fixed right-1 lg:right-20 top-28 transition-all duration-900 w-44 flex gap-3 p-4 bg-green-500/80 lg:bg-green-500/50 rounded-2xl ${isAnimationVisible ? 'animate-fadeInNotification' : 'animate-fadeOutNotification'} shadow-xl ${isNotificationVisible ? 'flex' : 'hidden'}`}
        >
          <div className={'w-7 h-7'}>
            <img
              src="/icons/headerIcons/cart.svg"
              alt=""
              className={'w-full, h-full, object-contain'}
            />
          </div>
          <p>Added to Cart</p>
        </div>
      </Link>
      <div className={'max-w-40 lg:max-w-64 max-h-64 self-center mb-20 mr-12'}>
        <img src={product.image} alt={`${product.name} image`} />
      </div>
      <div className={'flex flex-col gap-4'}>
        <h1 className={'text-2xl font-medium'}>{product.title}</h1>
        <h4 className={'text-1xl text-neutral-500'}>{product.price}$</h4>
        <p
          className={
            'max-w-140 pl-6 italic border-l-4 border-indigo-400 border-banner'
          }
        >
          {product.description}
        </p>
        <div className={'flex gap-8'}>
          <div className={'flex items-center gap-3 text-xl'}>
            <button
              className={`px-3 py-1 bg-slate-50 rounded-full  border-2 border-indigo-400 hover:border-indigo-600 ${quantity + 1 >= 100 && 'bg-neutral-200 hover:bg-neutral-200  border-zinc-700 hover:border-zinc-400'}`}
              disabled={quantity + 1 >= 100}
              onClick={() => setQuantity((prev) => Math.min(prev + 1, 99))}
            >
              +
            </button>
            <span className={'w-10 text-center custom-number-input'}>
              {quantity}
            </span>
            <button
              disabled={quantity <= 1}
              className={`px-3 py-1 bg-slate-50 hover:border-indigo-600 rounded-full 200 border-2 border-indigo-400 ${quantity - 1 <= 0 && 'bg-neutral-200 border-zinc-400 hover:border-zinc-400'}`}
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
          </div>
          <Button
            text={'ADD TO CART'}
            handleClick={() => {
              addToCart(product, quantity);
              toast('Added to the cart', {
                description: 'Visit your cart to see added products',
              });
            }}
            className={
              'px-4 py-2 w-fit border-2 border-indigo-400 bg-slate-50 hover:bg-slate-50'
            }
          />
        </div>
      </div>
    </div>
  );
};
