import { useEffect, useRef } from 'react';

import { Errors } from '../errors';
import { showToast } from '../utils/showToast';

import { useConnection } from './useConnection';

export const useShowTooltipOnNetworkError = () => {
  const isOnline = useConnection();
  const isMountRef = useRef(true);

  useEffect(() => {
    if (!isOnline) {
      showToast(Errors.NO_CONNECTION);
    }
    if (isOnline && !isMountRef.current) {
      showToast('Соединение восстановлено.');
    }
  }, [isOnline]);

  useEffect(() => {
    isMountRef.current = false;
  }, []);
};
