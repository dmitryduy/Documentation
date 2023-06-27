import React from 'react';
import cn from 'classnames';

import { IQuizQuestion } from '../../global.typings';

import {CheckboxStyled} from './Checkbox.styles';

interface ICheckboxProps {
    isDisabled: boolean;
    onClick: () => void;
    type: IQuizQuestion['type'];
    value: string;
    isActive: boolean;
    isError: boolean;
    onDelete?: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({onDelete, isError, onClick, isDisabled, type, value, isActive}) => {
  return (
    <CheckboxStyled
      className={cn({isError, isActive, isDisabled, checkbox: type === 'multiselect', radio: type === 'single'})}
      onClick={onClick}
      onDoubleClick={onDelete}>
      {value}
    </CheckboxStyled>
  );
};

export default Checkbox;