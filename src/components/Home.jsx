import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from './ProductCard.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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

  const handleOnClickSearch = () => {
    navigate('/products/', { state: { searchValueInput: searchValue } });
  };

  const handleOnChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div
        className={
          'grid lg:grid-cols-2 gap-4 mt-32 bg-banner rounded-3xl max-h-110 h-full min-h-110 relative'
        }
      >
        <div className="flex text-neutral-950 flex-col mx-16 gap-7 my-10 z-10">
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
                'my-6 min-w-72 p-2 border-2 border-neutral-400 shadow-2xl bg-neutral-50 rounded-xl text-medium font-medium flex justify-between text-neutral-700 border'
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
              src="../../public/homeComponentImages/plantBanner.png"
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
            <button
              className={
                'p-3 bg-banner text-start rounded-xl font-medium text-lg hover:bg-neutral-200 hover:scale-105 transition-all duration-200 w-full'
              }
            >
              See more →
            </button>
          </Link>
        </div>
        {productsList.map((product) => (
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

export function Search({
  value,
  handleOnChange,
  styles,
  buttonOnClick = null,
}) {
  return (
    <div className={styles}>
      <input
        type="text"
        className={'focus:outline-none bg-inherit w-full'}
        placeholder={'What are you looking for?'}
        value={value}
        onChange={handleOnChange}
      />
      <button
        className={
          'w-11 h-11 p-3 rounded-2xl bg-banner hover:bg-blue-100 transition-all duration-200 ml-auto'
        }
        onClick={buttonOnClick}
      >
        <img src="../../public/icons/headerIcons/search.svg" alt="" />
      </button>
    </div>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  styles: PropTypes.string,
  buttonOnClick: PropTypes.func,
};
