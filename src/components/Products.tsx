import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IProduct from '../types/product.types.js';
import { Search } from './Home.js';
import { ProductCard } from './ProductCard.js';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Products = () => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const { state } = useLocation();
  const { searchValueInput = '' } = state || {}; // Provide a default value

  const [searchValue, setSearchValue] = useState(searchValueInput);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
      setProductsList(json);
    }

    fetchProducts();
  }, []);

  const productCategories: string[] = [];
  productsList.forEach((product) => {
    if (!productCategories.includes(product.category)) {
      productCategories.push(product.category);
    }
  });

  return (
    <div className="mt-32 flex flex-col items-center w-full">
      <h1 className="text-3xl font-medium">Products</h1>
      <div className="flex items-center gap-12 lg:items-start flex-col lg:flex-row w-full">
        <div className="lg:sticky top-20 lg:mt-12 flex flex-col lg:items-start max-w-96 lg:w-auto">
          <Search
            value={searchValue}
            handleOnChange={(e) => setSearchValue(e.target.value)}
            styles="my-6 min-w-72 p-2 bg-neutral-50 rounded-xl text-medium font-medium flex justify-between text-neutral-700 border-2 shadow"
          />
          <ul
            className={
              'flex lg:flex-col gap-4 lg:gap-0.5 flex-wrap w-full justify-around'
            }
          >
            {productCategories.map((category, index) => (
              // TODO: Make key UUID
              <li
                key={index}
                className={`border-2 transition-all duration-200 border-banner p-3 w-full max-w-36 text-center lg:max-w-96 hover:bg-banner hover:text-neutral-50 ${category === selectedCategory && 'text-neutral-50 bg-banner'}`}
                onClick={() => setSelectedCategory(category)}
              >
                <button>{capitalize(category)}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:ml-auto grid items-center flex-grow grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 lg:gap-8 xl:gap-12 lg:my-16">
          {productsList.map((product) => {
            if (selectedCategory && selectedCategory !== product.category)
              return null;
            if (searchValue) {
              if (product.title.includes(searchValue)) {
                return (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <ProductCard
                      title={product.title}
                      price={product.price}
                      photoUrl={product.image}
                    />
                  </Link>
                );
              }
            } else {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    photoUrl={product.image}
                  />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
