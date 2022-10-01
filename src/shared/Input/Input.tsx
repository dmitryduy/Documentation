import React  from 'react';

import { InputStyled, Label } from './Input.styles';
import { InputContext } from './InputContext';
import Password from './Password/Password';

interface IInputProps {
  value: string;
  setValue: (value: React.FormEvent<HTMLInputElement> | string) => void;
  placeholder: string;
  label?: string;
  type: 'password' | 'text';
}

const Input: React.FC<IInputProps> = ({label, value, setValue, placeholder, type}) => {
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
        {type === 'password' && <Password/>}
        {type === 'text' && <input type="text" value={value} onInput={onInput} placeholder={placeholder}/>}
      </InputStyled>
    </InputContext.Provider>
  );
};

export default Input;