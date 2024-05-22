import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard.jsx';

export const Products = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
      setProductsList(json);
    }

    fetchProducts();
  }, []);

  return (
    <div className={'mt-32 flex flex-col items-center w-full'}>
      <h1 className={'text-3xl font-medium'}>Products</h1>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 my-16'
        }
      >
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            photoUrl={product.image}
          />
        ))}
      </div>
    </div>
  );
};
