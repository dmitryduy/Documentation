import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Tooltip from './shared/Tooltip/Tooltip';
import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import { useAuth } from './hooks/useAuth';
import { routes } from './routes';
import { showTooltip } from './utils/showTooltip';
import { useAppDispatch } from './hooks/useAppSelector';
import { authMe } from './reducers/authReducer/authReducer';
import Loader from './shared/Loader/Loader';
import { Wrapper } from './App.styles';


windowExtends();

function App() {
  const dispatch = useAppDispatch();
  useShowTooltipOnNetworkError();
  const {isLogin} = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(authMe())
      .unwrap()
      .then(() => setShow(true))
      .catch(e => {
        setShow(true);
        showTooltip(e);
      });
  }, []);

  const routesMemo = useMemo(() => (isLogin ? routes.private : routes.common), [isLogin]);

  if (!show) return <Wrapper><Loader/></Wrapper>;

  return (
    <>
      <Wrapper>
        {isLogin && <Header/>}
        <Routes>
          {routesMemo.map(route =>
            <Route
              key={route.path}
              path={route.path}
              element={<route.component/>}
            />)}
          <Route path="*" element={<Navigate to={isLogin ? '/' : '/login'}/>}/>
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
