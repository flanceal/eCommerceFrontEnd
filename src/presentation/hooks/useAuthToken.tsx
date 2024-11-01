import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export function useAuthToken() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getAccessTokenSilently();
        localStorage.setItem('auth_token', fetchedToken);
        setToken(fetchedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  return token;
}
