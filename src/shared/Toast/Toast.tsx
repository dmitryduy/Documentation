import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Errors } from '../../errors';
import { Event, eventManager } from '../../utils/emitter';

import { TooltipStyled } from './Toast.styles';

const TIMEOUT = 2000;

const Toast = observer(() => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const showToast = (value: string) => {
      setValue(value);
      setActive(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setActive(false);
      }, TIMEOUT);
    };

    eventManager.on(Event.SHOW_TOAST, showToast);

  }, []);
  console.log(7);
  return (
    <TooltipStyled className={cn({active})}>
      {value}
    </TooltipStyled>
  );
});

export default Toast;