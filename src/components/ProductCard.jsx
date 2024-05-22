import PropTypes from 'prop-types';

export function ProductCard({ title, price, photoUrl }) {
  return (
    <div
      className={
        'flex flex-col gap-3 hover:cursor-pointer hover:scale-105 transition-all duration-200 border-neutral-200 ' +
        'w-64 h-80 border-2 p-6 rounded-md shadow-xl'
      }
    >
      <div className={'w-full overflow-hidden p-3'}>
        <img src={photoUrl} alt="" className={'w-full object-contain h-32'} />
      </div>
      <h3 className={'font-medium text-xl'}>
        {title.length >= 36 ? `${title.slice(0, 36)}...` : title}
      </h3>
      <h4 className={'font-medium text-neutral-400 mt-auto'}>{price}$</h4>
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  photoUrl: PropTypes.string,
};
