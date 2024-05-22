import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Header = () => {
  const [pageOpened, setPageOpened] = useState('Home');
  const [modalView, setModalView] = useState(false);

  function handleOpen(event) {
    setPageOpened(event.currentTarget.textContent);
  }

  function toggleHeaderModal() {
    setModalView((prevState) => !prevState);
  }

  return (
    <header
      className={
        'flex flex-col justify-center items-center px-16 py-6 border-b-2 w-full bg-zinc-50/90 fixed z-30'
      }
    >
      <nav className={'max-w-screen-xl w-full'}>
        <ul className={'flex gap-28 items-center justify-between'}>
          <li>
            <Logo />
          </li>
          <div
            className={
              'hidden lg:flex gap-8 items-center font-medium text-neutral-500'
            }
          >
            <li
              className={`hover:text-neutral-950 ${pageOpened === 'Home' && 'text-neutral-950'}`}
              onClick={handleOpen}
            >
              <Link to={'/'}>Home</Link>
            </li>
            <li
              className={`hover:text-neutral-950 ${pageOpened === 'Products' && 'text-neutral-950'}`}
              onClick={handleOpen}
            >
              <Link to={'/products'}>Products</Link>
            </li>
            <li
              className={`hover:text-neutral-950 ${pageOpened === 'About Us' && 'text-neutral-950'}`}
              onClick={handleOpen}
            >
              <Link to={'/about-us'}>About Us</Link>
            </li>
          </div>
          <div className={'hidden lg:flex ml-auto gap-5 items-center'}>
            <Link to={'/products'}>
              <HeaderIcon iconName={'search'} />
            </Link>
            <Link to={'/cart'}>
              <HeaderIcon iconName={'cart'} />
            </Link>
            <Link to={'/profile'}>
              <HeaderIcon iconName={'userPic'} />
            </Link>
          </div>
          <button
            className={'w-11 h-11 p-2 lg:hidden'}
            onClick={toggleHeaderModal}
          >
            <img
              src="../../public/icons/headerIcons/burger-menu.svg"
              alt="Drop down"
              className={'w-full h-full'}
            />
          </button>
        </ul>
      </nav>
      <ModalHeader isOpened={modalView} toggleModal={toggleHeaderModal} />
    </header>
  );
};

function Logo() {
  return (
    <div
      className={
        'font-bold text-lg transition-all duration-300 transform hover:scale-110'
      }
    >
      <Link to={'/'}>Plantify</Link>
    </div>
  );
}

function ModalHeader({ isOpened, toggleModal }) {
  return (
    <ul
      className={`gap-10 w-screen h-screen bg-neutral-200/30 items-center mt-16 font-medium text-2xl transition-all duration-300
      ${isOpened ? 'flex flex-col animate-fadeIn' : 'hidden animate-fadeOut'} 
      `}
    >
      <li onClick={toggleModal}>
        <Link to={'/'}>Home</Link>
      </li>
      <li onClick={toggleModal}>
        <Link to={'/products'}>Products</Link>
      </li>
      <li onClick={toggleModal}>
        <Link to={'/products'}>About Us</Link>
      </li>
    </ul>
  );
}

function HeaderIcon({ iconName }) {
  return (
    <div
      className={
        'w-10 h-10 p-1.5 rounded-full hover:bg-neutral-300 transition-all duration-200'
      }
    >
      <img
        src={`../../public/icons/headerIcons/${iconName}.svg`}
        alt={`${iconName} Icon`}
        className={'w-full'}
      />
    </div>
  );
}

HeaderIcon.propTypes = {
  iconName: PropTypes.string,
};

ModalHeader.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
