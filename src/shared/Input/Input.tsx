import React from 'react';

import { InputStyled } from './Input.styles';

interface IInputProps {
  value: string;
  setValue: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<IInputProps> = ({value, setValue, onKeyDown, placeholder}) => {
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
  };

  return (
    <InputStyled value={value} onInput={onInput} onKeyDown={onKeyDown} placeholder={placeholder}/>
  );
};

export default Input;