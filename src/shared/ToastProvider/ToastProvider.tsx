import React, { PropsWithChildren, useRef, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { ToastContext } from '../../hooks/useToast';
import { Errors } from '../../errors';

import {TooltipStyled} from './ToastProvider.styles';

interface IToastProviderProps {
  timeout?: number;
}

const ToastProvider: React.FC<IToastProviderProps & PropsWithChildren> = observer(({children, timeout = 2000}) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const showToast = (value: any) => {
    if (typeof value === 'string') {
      setValue(value);
    } else if (value instanceof Error) {
      setValue(value.message);
    } else {
      setValue(Errors.UNEXPECTED_ERROR);
      console.log(value);
    }
    setActive(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setActive(false);
    }, timeout);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      <TooltipStyled className={cn({active})}>
        {value}
      </TooltipStyled>
      {children}
    </ToastContext.Provider>
  );
});

export default ToastProvider;