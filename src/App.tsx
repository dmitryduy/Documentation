import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Tooltip from './shared/Tooltip/Tooltip';
import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import { useAuth } from './hooks/useAuth';
import { routes } from './routes';
import { authMe } from './api/authMe';
import { showTooltip } from './utils/showTooltip';
import { Errors } from './errors';
import { useAppDispatch } from './hooks/useAppSelector';
import { loginUser } from './reducers/authReducer/authReducer';
import Loader from './shared/Loader/Loader';
import { Wrapper } from './App.styles';


windowExtends();

function App() {
  const dispatch = useAppDispatch();
  useShowTooltipOnNetworkError();
  const {isLogin} = useAuth();
  const [show, setShow] = useState(false);
  useEffect(() => {
    authMe()
      .then(data => {
        setShow(true);
        if (data.auth) {
          dispatch(loginUser(data.login!));
        }
      })
      .catch(e => {
        setShow(true);
        showTooltip(Errors.UNEXPECTED_ERROR);
      });
  }, []);

  if (!show) return <Loader/>;

  return (
    <>
      <Wrapper>
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
          <Route path="*" element={<Navigate to={isLogin ? '/Documentation' : '/login'}/>}/>
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
