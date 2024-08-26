import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      <div className={'flex-1 max-w-40 lg:max-w-64 max-h-64 self-center mb-20'}>
        <img src={product.image} alt={`${product.name} image`} />
      </div>
      <div className={'flex flex-col gap-4'}>
        <h1 className={'text-2xl font-medium'}>{product.title}</h1>
        <h4 className={'text-1xl text-neutral-500'}>{product.price}$</h4>
        <p className={'max-w-140 pl-6 italic border-l-4 border-banner'}>
          {product.description}
        </p>
        <div className={'flex gap-8'}>
          <div className={'flex gap-3 text-xl'}>
            <button
              className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${quantity + 1 >= 100 && 'bg-neutral-200 hover:bg-neutral-200 '}`}
              disabled={quantity + 1 >= 100}
              onClick={() => setQuantity((prev) => Math.min(prev + 1, 99))}
            >
              +
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              min={'1'}
              max={'99'}
              className={'w-10 text-center custom-number-input'}
            />
            <button
              disabled={quantity <= 1}
              className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${quantity - 1 <= 0 && 'bg-neutral-200 hover:bg-neutral-200 '}`}
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
          </div>
          <Button
            text={'Add to Cart'}
            handleClick={() => {
              addToCart(product, quantity);
              showNotification();
            }}
            className={'px-4 py-2 w-fit'}
          />
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
