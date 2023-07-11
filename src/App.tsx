import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useShowTooltipOnNetworkError } from '@hooks/useShowTooltipOnNetworkError';
import { useStores } from '@hooks/useStores';
import Toast from '@shared/Toast/Toast';

import { Wrapper } from './App.styles';

const App = observer(() => {
  useShowTooltipOnNetworkError();
  const {authStore} = useStores();

  useEffect(() => {
    authStore.authMe();
  }, []);

  return (
    <Wrapper>
      <Toast/>
      <Outlet/>
    </Wrapper>
  );
});

export default App;
