import classNames from 'classnames';
import ButtonProps from '../types/button.types';

export const CustomButton: React.FC<ButtonProps> = ({
  text,
  icon: iconPath = null,
  handleClick,
  className = '',
}) => {
  return (
    <>
      <button
        className={classNames(
          'p-3 text-start rounded-xl font-medium text-lg hover:bg-neutral-200 hover:scale-105 transition-all duration-200 flex gap-3 items-center',
          className
        )}
        onClick={handleClick}
      >
        {text}
        {iconPath && <img src={iconPath} alt={text} className={'w-6 h-6'} />}
      </button>
    </>
  );
};
