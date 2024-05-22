export function ProductCard() {
  return (
    <div
      className={
        'flex flex-col gap-2 hover:cursor-pointer transition-all duration-200 hover:scale-105'
      }
    >
      <div className={'w-full h-30 rounded-3xl'}>
        <img
          src="../../public/homeComponentImages/plant.png"
          alt=""
          className={'w-full h-full'}
        />
      </div>
      <h3 className={'font-medium text-xl'}>Aloe Vera</h3>
      <h4 className={'font-medium text-neutral-400'}>59$</h4>
    </div>
  );
}
