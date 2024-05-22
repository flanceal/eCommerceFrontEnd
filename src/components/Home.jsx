import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard.jsx';

export const Home = () => {
  return (
    <>
      <div
        className={
          'grid lg:grid-cols-2 gap-4 mt-32 bg-banner rounded-3xl max-h-110 h-full min-h-110 relative'
        }
      >
        <div className="flex flex-col mx-16 gap-7 my-10 z-10">
          <h1 className={'text-5xl font-bold'}>
            Buy your dream
            <br /> plants
          </h1>
          <div className={'flex gap-3'}>
            <div className={'flex flex-col gap-1'}>
              <span className={'text-3xl font-medium'}>50+</span>
              <span className={'text-lg'}>Plant Species</span>
            </div>
            <div className={'flex flex-col gap-1'}>
              <span className={'text-3xl font-medium'}>50+</span>
              <span className={'text-lg'}>Plant Species</span>
            </div>
          </div>
          <div className={'hidden sm:block'}>
            <Search />
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};

function Search() {
  return (
    <div className={'my-6 p-3 bg-neutral-50 rounded-xl flex justify-between'}>
      <input
        type="text"
        className={
          'focus:outline-none bg-inherit text-lg font-medium text-neutral-700 w-full'
        }
        placeholder={'What are you looking for?'}
      />
      <div
        className={
          'w-11 h-11 p-3 rounded-2xl bg-banner hover:bg-blue-100 transition-all duration-200'
        }
      >
        <img src="../../public/icons/headerIcons/search.svg" alt="" />
      </div>
    </div>
  );
}
