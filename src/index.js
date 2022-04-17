import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import { PlacesContextProvider } from './contexts/PlacesContext';
import { UsersContextProvider } from './contexts/UsersContext';
import { AccessibleInterfaceContextProvider } from './contexts/AccessibleInterfaceContext';
import CurrentUserContext, { CURRENT_USER_FROM_CONTEXT } from './contexts/CurrentUserContext';
import './i18next';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserContext.Provider value={CURRENT_USER_FROM_CONTEXT}>
      <PlacesContextProvider>
        <UsersContextProvider>
          <AccessibleInterfaceContextProvider>
            <App />
          </AccessibleInterfaceContextProvider>
        </UsersContextProvider>
      </PlacesContextProvider>
    </CurrentUserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
