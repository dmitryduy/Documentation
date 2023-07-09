import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import windowExtends from './declare';
import { useShowTooltipOnNetworkError } from './hooks/useShowTooltipOnNetworkError';
import Loader from './shared/Loader/Loader';
import { Wrapper } from './App.styles';
import { useStores } from './hooks/useStores';
import ToastProvider from './shared/ToastProvider/ToastProvider';


windowExtends();

const App = observer(() => {
  useShowTooltipOnNetworkError();
  const {authStore} = useStores();

  useEffect(() => {
    authStore.authMe();
  }, []);



  return (
    <Wrapper>
      <ToastProvider/>
      <Outlet/>
    </Wrapper>
  );
});

export default App;
