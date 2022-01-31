import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './AuthContext';
import { SettingsProvider } from './Settings';
import { StateMachineProvider } from 'little-state-machine';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <SettingsProvider>
              <AuthContextProvider>
                  <StateMachineProvider>
                     <App />
                  </StateMachineProvider>
              </AuthContextProvider>
          </SettingsProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
