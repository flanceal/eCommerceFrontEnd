import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({
  text,
  icon: iconPath = null,
  handleClick = null,
  className = '',
}) => {
  return (
    <>
      <button
        className={classNames(
          'p-3 bg-banner text-start rounded-xl font-medium text-lg hover:bg-neutral-200 hover:scale-105 transition-all duration-200 w-full flex gap-3 items-center',
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

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};
