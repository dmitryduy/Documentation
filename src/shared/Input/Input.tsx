import React, { forwardRef } from 'react';

import { getInputValue } from '../../hooks/useInput';

import { InputStyled, Label } from './Input.styles';
import { InputContext } from './InputContext';
import Password from './Password/Password';

interface IInputProps {
  value: string;
  setValue: (value: React.FormEvent<HTMLInputElement> | string) => void;
  placeholder: string;
  label?: string;
  type: 'password' | 'text';
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({label, value, setValue, placeholder, type, onEnter},
    ref) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onEnter && onEnter();
      }
    };

    return (
      <InputContext.Provider value={{value, setValue: e => setValue(getInputValue(e)), placeholder}}>
        <InputStyled className="input">
          {label && <Label>{label}</Label>}
          {type === 'password' && <Password/>}
          {type === 'text' &&
        <input ref={ref} type="text" value={value} onKeyDown={onKeyDown} onInput={e => setValue(getInputValue(e))}
          placeholder={placeholder}/>}
        </InputStyled>
      </InputContext.Provider>
    );
  });

export default Input;