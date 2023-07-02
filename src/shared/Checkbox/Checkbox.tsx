import React from 'react';
import cn from 'classnames';

import { CheckboxStyled } from './Checkbox.styles';

export enum CheckboxState {
  SELECTED,
  INCORRECT,
  CORRECT,
  NOT_SELECTED
}

interface ICheckboxProps {
  isDisabled: boolean;
  value: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  type: 'radio' | 'checkbox';
  state: CheckboxState;
}

const Checkbox: React.FC<ICheckboxProps> = ({state, onDoubleClick, onClick, isDisabled, type, value}) => {
  return (
    <CheckboxStyled
      className={cn({
        isError: state === CheckboxState.INCORRECT,
        isCorrect: state === CheckboxState.CORRECT,
        isActive: state === CheckboxState.SELECTED,
        checkbox: type === 'checkbox',
        radio: type === 'radio',
        isDisabled
      })}
      onClick={!isDisabled ? onClick : () => void 0}
      onDoubleClick={!isDisabled ? onDoubleClick : () => void 0}>
      {value}
    </CheckboxStyled>
  );
};

export default Checkbox;