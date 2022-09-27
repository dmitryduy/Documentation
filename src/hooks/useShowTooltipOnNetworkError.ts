import { useEffect, useRef } from 'react';

import { showTooltip } from '../utils/showTooltip';
import { Errors } from '../errors';

import { useConnection } from './useConnection';

export const useShowTooltipOnNetworkError = () => {
  const isOnline = useConnection();
  const isMountRef = useRef(true);

  useEffect(() => {
    if (!isOnline) {
      showTooltip(Errors.NO_CONNECTION);
    }
    if (isOnline && !isMountRef.current) {
      showTooltip('Соединение восстановлено.');
    }
  }, [isOnline]);

  useEffect(() => {
    isMountRef.current = false;
  }, []);
};
