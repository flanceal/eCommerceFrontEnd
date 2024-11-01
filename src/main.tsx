import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ConfigService from './services/config/config.service.js';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={ConfigService.getAuth0Domain()}
      clientId={ConfigService.getAuth0ClientId()}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: ConfigService.getAuth0Audience(),
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
