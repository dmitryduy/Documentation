import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './store/store';
import Theme from './Theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Theme>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Theme>
  </Provider>
);
