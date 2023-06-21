import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import { useAuth } from './hooks/useAuth';
import { routes } from './routes';
import { showTooltip } from './utils/showTooltip';
import { useAppDispatch } from './hooks/useAppSelector';
import Loader from './shared/Loader/Loader';
import { Wrapper } from './App.styles';
import { createUserManager } from './api/userManager/createUserManager';
import { setUser } from './reducers/authReducer/authReducer';


windowExtends();

function App() {
  const dispatch = useAppDispatch();
  useShowTooltipOnNetworkError();
  const {isLogin} = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userManager = createUserManager();
    userManager.authMe()
      .then(data => dispatch(setUser({login: data.login})))
      .catch(showTooltip)
      .finally(() => setShow(true));
  }, []);

  const routesMemo = useMemo(() => (isLogin ? routes.private : routes.common), [isLogin]);

  if (!show) return <Wrapper><Loader/></Wrapper>;

  return (
    <>
      <Wrapper>
        <Routes>
          {routesMemo.map(route =>
            <Route
              key={route.path}
              path={route.path}
              element={<route.component/>}
            />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
