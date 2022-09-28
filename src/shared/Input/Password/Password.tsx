import React  from 'react';

import { useInputContext } from '../Input.hook/useInputContext';

import {PasswordStyled} from './Password.styles';
import { usePasswordType } from './Password.hook/usePasswordType';


const Password = () => {
  const {error, context} = useInputContext();
  const [type, setType] = usePasswordType();
  if (error) {
    return null;
  }

  const {value, setValue, placeholder} = context;
  return (
    <PasswordStyled >
      <input value={value} onInput={setValue} type={type} placeholder={placeholder}/>
      <span onClick={() => setType()} className="show-button">{type === 'password' ? 'Показать' : 'Скрыть'}</span>
    </PasswordStyled>
  );
};

export default Password;