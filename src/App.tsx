import React, { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import { routes } from './routes';
import Loader from './shared/Loader/Loader';
import { Wrapper } from './App.styles';
import { useStores } from './hooks/useStores';


windowExtends();

const App = observer(() => {
  useShowTooltipOnNetworkError();
  const {authStore} = useStores();

  useEffect(() => {
    authStore.authMe();
  }, []);

  const routesMemo = useMemo(() => (authStore.login ? routes.private : routes.common), [authStore.login]);

  if (authStore.isLoading) {
    return <Wrapper><Loader/></Wrapper>;
  }

  return (
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
  );
});

export default App;
