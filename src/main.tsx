import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import ConfigService from './services/config/config.service.js';

const rootElement = document.getElementById('root') as HTMLElement;

console.log(`Config Domain: ${ConfigService.getAuth0Domain()}`);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={ConfigService.getAuth0Domain()}
      clientId={ConfigService.getAuth0ClientId()}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
