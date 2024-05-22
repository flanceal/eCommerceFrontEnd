import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  function handleChange(event) {
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

  console.log(quantity);

  return (
    <div className={'flex flex-col lg:flex-row  justify-around mt-32 lg:mt-48'}>
      <div className={'flex-1 max-w-40 lg:max-w-64 max-h-64 self-center mb-20'}>
        <img src={product.image} alt={`${product.name} image`} />
      </div>
      <div className={'flex flex-col gap-4'}>
        <h1 className={'text-2xl font-medium'}>{product.title}</h1>
        <h4 className={'text-1xl text-neutral-500'}>
          {product.price}
          <span className={'text-green-800'}>$</span>{' '}
        </h4>
        <p
          className={
            'max-w-140 p-4 bg-banner rounded-2xl border border-gray-400'
          }
        >
          {product.description}
        </p>
        <div className={'flex gap-8'}>
          <div className={'flex gap-3 text-xl'}>
            <button
              className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${quantity + 1 >= 100 && 'bg-neutral-200'}`}
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
              className={`px-3 py-1.5 bg-banner hover:bg-slate-400 rounded-full ${quantity - 1 <= 0 && 'bg-neutral-200'}`}
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
          </div>
          <button
            className={
              'px-4 py-2 border-4 border-banner font-medium rounded-3xl hover:bg-banner hover:text-neutral-50 transition-all duration-200'
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
