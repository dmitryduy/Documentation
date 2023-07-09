import React from 'react';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { spy } from 'mobx';

import App from './App';
import Theme from './Theme';
import Toast from './shared/Toast/Toast';
import { StoreContext } from './hooks/useStores';
import { RootStore } from './stores/rootStore';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import EditPostPage from './pages/EditPostPage/EditPostPage';

spy(ev => {
  if (ev.type === 'action') {
    console.log(ev);
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="article">
        <Route path=":title" element={<ArticlePage/>}/>
        <Route index element={<ArticlePage/>}/>
        <Route path="create" element={<NewPostPage/>}/>
        <Route path="edit/:title" element={<EditPostPage/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/article" replace/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreContext.Provider value={new RootStore()}>
    <Theme>
      <RouterProvider router={router}/>
    </Theme>
  </StoreContext.Provider>
);
