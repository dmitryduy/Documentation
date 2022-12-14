import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';

import {TooltipStyled} from './Tooltip.styles';
import { TOOLTIP_SHOW_TIME } from './Tooltip.constants';


const Tooltip = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEmit<{title: string}>(EmitterNames.TOOLTIP_SHOW, ({title}) => {
    setValue(title);
    setActive(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setActive(false), TOOLTIP_SHOW_TIME);
  });

  return (
    <TooltipStyled className={cn({active})}>
      {value}
    </TooltipStyled>
  );
};

export default Tooltip;