import React, { forwardRef } from 'react';

import { InputStyled, Label } from './Input.styles';
import { InputContext } from './InputContext';
import Password from './Password/Password';

interface IInputProps {
  value: string;
  setValue: (value: React.FormEvent<HTMLInputElement> | string) => void;
  placeholder: string;
  label?: string;
  children?: React.ReactNode;
}

interface IInputComponent {
  Password: typeof Password;
}

const Input: React.FC<IInputProps> & IInputComponent = ({label, value, setValue, placeholder, children}) => {
  const onInput = (e: React.FormEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setValue(e);
      return;
    }
    setValue((e.target as HTMLInputElement).value);
  };

  return (
    <InputContext.Provider value={{value, setValue: onInput, placeholder}}>
      <InputStyled className="input">
        {label && <Label>{label}</Label>}
        {children || <input type="text" value={value} onInput={onInput} placeholder={placeholder}/>}
      </InputStyled>
    </InputContext.Provider>
  );
};

Input.Password = Password;

export default Input;