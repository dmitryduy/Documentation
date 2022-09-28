import { useContext, useEffect, useState } from 'react';

import { InputContext } from '../InputContext';

export const useInputContext = () => {
  const [error, setError] = useState(false);
  const context = useContext(InputContext);

  useEffect(() => {
    if (!context) {
      console.warn('Input must calls with Input container');
    }
    setError(!context);
  }, [context]);

  return {error, context};

};
