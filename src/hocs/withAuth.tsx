import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { useStores } from '../hooks/useStores';

export function withAuth<T>(Component: ComponentType<T >): React.FC<T> {
  return (hocProps: T) => {
    const {authStore} = useStores();
    if (!authStore.login) {
      return <Navigate to="/article"/>;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...hocProps} />;
  };
}