import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Tooltip from './shared/Tooltip/Tooltip';
import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import { useAuth } from './hooks/useAuth';
import { routes } from './routes';


windowExtends();

function App() {
  useShowTooltipOnNetworkError();
  const {isLogin} = useAuth();

  return (
    <>
      <div className="wrapper">
        <Tooltip/>
        {isLogin && <Header/>}
        <Routes>
          {isLogin &&
            routes.private.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component/>}
              />)}
          {!isLogin &&
            routes.common.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={<route.component/>}
              />)}
          <Route path="*" element={<Navigate to={isLogin ? '/Documentation' : '/register'}/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
