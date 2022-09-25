import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Theme from './Theme';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import Header from './components/Header/Header';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import Tooltip from './shared/Tooltip/Tooltip';
import windowExtends from './declare';
import { store } from './store/store';
import EditPostPage from './pages/EditPostPage/EditPostPage';

windowExtends();

function App() {
  return (
    <Theme>
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Tooltip/>
          <div className="wrapper">
            <Routes>
              <Route path="/Documentation" element={<ArticlePage/>}/>
              <Route path="/create-post" element={<NewPostPage/>}/>
              <Route path="/edit-post/:title" element={<EditPostPage/>}/>
              <Route path="/post/:title" element={<ArticlePage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </Theme>
  );
}

export default App;
