import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { HeaderIcon } from './Header';

const AccountDropdown = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout } =
    useAuth0();

  useEffect(() => {
    const setTokenIfAvailable = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    };

    setTokenIfAvailable();
  }, [isAuthenticated]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HeaderIcon iconName={'userPic'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated ? (
          <button>
            <DropdownMenuLabel onClick={() => logout()}>
              Log out
            </DropdownMenuLabel>
          </button>
        ) : (
          <button>
            <DropdownMenuLabel onClick={() => loginWithRedirect()}>
              Log in
            </DropdownMenuLabel>
          </button>
        )}
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Orders</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
