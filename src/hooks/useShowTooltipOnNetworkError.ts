import { useEffect, useRef } from 'react';

import { Errors } from '../errors';

import { useConnection } from './useConnection';
import { useToast } from './useToast';

export const useShowTooltipOnNetworkError = () => {
  const isOnline = useConnection();
  const isMountRef = useRef(true);
  const showToast = useToast();

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
