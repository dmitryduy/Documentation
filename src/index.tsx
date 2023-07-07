import React from 'react';
import './index.css';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { spy } from 'mobx';

import App from './App';
import Theme from './Theme';
import Tooltip from './shared/Tooltip/Tooltip';
import { StoreContext } from './hooks/useStores';
import { RootStore } from './stores/rootStore';

spy(ev => {
  if (ev.type === 'action') {
    console.log(ev);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={new RootStore()}>
    <Theme>
      <HashRouter>
        <Tooltip/>
        <App/>
      </HashRouter>
    </Theme>
  </StoreContext.Provider>
);
