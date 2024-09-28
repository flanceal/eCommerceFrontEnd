import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [pageOpened, setPageOpened] = useState<string | null>('Home');
  const [modalView, setModalView] = useState(false);

  function handleOpen(event: React.MouseEvent<HTMLLIElement>) {
    setPageOpened(event.currentTarget.textContent);
  }

  function toggleHeaderModal() {
    setModalView((prevState) => !prevState);
  }

  let headerClasses: string;
  if (modalView) {
    headerClasses =
      'flex flex-col justify-center items-center px-16 py-6 border-b-2 w-full  bg-neutral-200/30 fixed z-30';
  } else {
    headerClasses =
      'flex flex-col justify-center items-center px-16 py-6 border-b-2 w-full bg-zinc-50/90 fixed z-30';
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
            className={
              'w-11 h-11 p-2 lg:hidden transition-all duration-150 transform hover:scale-125'
            }
            onClick={toggleHeaderModal}
          >
            {modalView ? (
              <CloseIcon />
            ) : (
              <img
                src="/icons/headerIcons/burger-menu.svg"
                alt="Drop down"
                className={'w-full h-full'}
              />
            )}
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

interface ModalHeaderProps {
  isOpened: boolean;
  toggleModal: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ isOpened, toggleModal }) => {
  return (
    <ul
      className={`gap-10 w-screen h-screen bg-neutral-200/30 items-center mt-5 pt-14 font-medium text-2xl transition-all duration-300 ${isOpened ? 'flex flex-col animate-fadeInHeader' : 'hidden animate-fadeOutHeader'}`}
    >
      <li onClick={toggleModal}>
        <Link to={'/'}>Home</Link>
      </li>
      <li onClick={toggleModal}>
        <Link to={'/products'}>Products</Link>
      </li>
      <li onClick={toggleModal}>
        <Link to={'/about-us'}>About Us</Link>
      </li>
      <li onClick={toggleModal}>
        <Link to={'/cart'}>Cart</Link>
      </li>
    </ul>
  );
};

interface HeaderIconProps {
  iconName: string;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ iconName }) => {
  return (
    <div
      className={
        'w-10 h-9 p-1.5 rounded-full hover:bg-neutral-300 transition-all duration-200'
      }
    >
      <img
        src={`/icons/headerIcons/${iconName}.svg`}
        alt={`${iconName} Icon`}
        className={'w-full'}
      />
    </div>
  );
};
