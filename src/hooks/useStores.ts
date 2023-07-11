import { createContext, useContext } from 'react';
import { RootStore } from '@stores/rootStore';

export const StoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('Need StoreContextProvider');
  }

  return context;
};
