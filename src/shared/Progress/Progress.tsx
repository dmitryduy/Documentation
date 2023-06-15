import React from 'react';
import cn from 'classnames';

import {ProgressStyled} from './Progress.styles';

interface IProgressProps {
    currentProgress: number;
    maxProgress: number;
}

const Progress: React.FC<IProgressProps> = ({currentProgress, maxProgress}) => {
  return (
    <ProgressStyled>
      <span
        className={cn('progress', {error: currentProgress > maxProgress})}
        style={{width: `${Math.min(currentProgress / maxProgress * 100, 100)}%`}}/>
      {currentProgress}/{maxProgress}
    </ProgressStyled>
  );
};

export default Progress;