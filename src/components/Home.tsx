import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IProduct from '../types/product.types.js';
import { CustomButton } from './Button.js';
import { ProductCard } from './ProductCard.js';

export const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [productsList, setProductsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      setProductsList(data.slice(0, 3));
    }

    fetchProducts();
  }, []);

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOnClick = () => {
    navigate('/products');
  };

  const handleOnClickSearch = () => {
    navigate('/products/', { state: { searchValueInput: searchValue } });
  };

  return (
    <>
      <div
        className={
          'grid lg:grid-cols-2 gap-4 mt-32 bg-banner rounded-3xl max-h-110 h-full min-h-110 relative bg-zinc-950 text-white'
        }
      >
        <div className="flex flex-col mx-16 gap-7 my-10 z-10">
          <h1 className={'text-5xl font-bold'}>
            Buy your dream
            <br /> things
          </h1>
          <div className={'flex gap-3'}>
            <div className={'flex flex-col gap-1'}>
              <span className={'text-3xl font-medium'}>50+</span>
              <span className={'text-lg'}>Plant Species</span>
            </div>
            <div className={'flex flex-col gap-1'}>
              <span className={'text-3xl font-medium'}>50+</span>
              <span className={'text-lg'}>Clothes Products</span>
            </div>
          </div>
          <div className={'sm:block'}>
            <Search
              styles={
                'my-6 min-w-60 p-2 border-2 border-neutral-400 shadow-2xl bg-neutral-50 rounded-xl text-medium font-medium flex text-neutral-700 border'
              }
              value={searchValue}
              handleOnChange={handleOnChangeSearch}
              buttonOnClick={handleOnClickSearch}
            />
          </div>
        </div>
        <div
          className={
            'flex items-center justify-center absolute lg:relative right-1 blur-sm'
          }
        >
          <div className={'w-110'}>
            <img
              src="/homeComponentImages/plantBanner.png"
              alt="Plant Banner"
              className={'w-full h-full'}
            />
          </div>
        </div>
      </div>
      <div className={'grid grid-cols-2 gap-4 my-16 lg:grid-cols-4'}>
        <div className={'flex flex-col gap-3'}>
          <h3 className={'font-bold text-2xl'}>Best Selling Plants</h3>
          <p className={'font-medium text-zinc-500 text-lg'}>
            Easiest way to healthy life by buying your favorite plants
          </p>
          <Link to={'/products'} className={''}>
            <Button onClick={handleOnClick}> See more → </Button>
          </Link>
        </div>
        {productsList.map((product: IProduct) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard
              title={product.title}
              price={product.price}
              photoUrl={product.image}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

interface SearchProps {
  value: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonOnClick?: () => void;
  styles: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  handleOnChange,
  styles,
  buttonOnClick,
}) => {
  return (
    <div className={`${styles} flex items-center`}>
      <input
        type="text"
        className={
          'focus:outline-none overflow-hidden bg-inherit flex-grow flex-shrink'
        }
        placeholder={'What are you looking for?'}
        value={value}
        onChange={handleOnChange}
      />
      <Button onClick={buttonOnClick} className="w-19 h-19">
        <MagnifyingGlassIcon className={'w-6 h-6'} color="white" />
      </Button>
    </div>
  );
};
