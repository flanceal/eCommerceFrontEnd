import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IProduct from '../domain/entities/product.entity.js';
import useFetchProducts from '../presentation/hooks/useFetchProducts.js';
import CategoryFilters from './CategoriesFilter.js';
import { Search } from './Home.js';
import { ProductCard } from './ProductCard.js';
import { Skeleton } from './ui/skeleton.js';

export const Products = () => {
  const { products, error, isLoading } = useFetchProducts();
  const { state } = useLocation();
  const { searchValueInput = '' } = state || {};
  const [value, setValue] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState(searchValueInput);

  const productCategories: string[] = [];

  if (!products) {
    return <h1>Fuck you</h1>;
  }

  products.forEach((product) => {
    if (!productCategories.includes(product.category)) {
      productCategories.push(product.category);
    }
  });

  return (
    <div className="mt-32 flex flex-col items-center w-full">
      <div className="flex items-center gap-12 lg:items-start flex-col lg:flex-row w-full">
        <div className="lg:sticky top-20 lg:mt-12 flex flex-col gap-3 lg:items-start max-w-md lg:w-auto">
          <Search
            value={searchValue}
            handleOnChange={(e) => setSearchValue(e.target.value)}
            styles="my-6 min-w-72 p-2 bg-neutral-50 rounded-xl text-base flex justify-between text-neutral-700 border-2 shadow"
          />
          <CategoryFilters
            productCategories={productCategories}
            value={value}
            setValue={setValue}
          />
        </div>
        <div className="lg:ml-auto grid items-center flex-grow grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 lg:gap-8 xl:gap-12 lg:my-16">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-80 w-[250px]" />
                </div>
              ))
            : products.map((product: IProduct) => {
                if (
                  value &&
                  value.toLowerCase() !== product.category.toLowerCase()
                )
                  return null;
                if (searchValue) {
                  if (product.title.includes(searchValue)) {
                    return (
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard
                          title={product.title}
                          price={product.price}
                          photoUrl={product.imageUrl}
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
                        photoUrl={product.imageUrl}
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
