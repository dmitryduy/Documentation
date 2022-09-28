import React from 'react';
import { Link } from 'react-router-dom';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';
import { useInput } from '../../hooks/useInput';

import {RegisterPageStyled} from './RegisterPage.styles';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from './RegisterPage.constants';
import { useRegister } from './RegisterPage.hook/useRegister';


const RegisterPage = () => {
  const [login, setLogin] = useInput('', MAX_LOGIN_LENGTH);
  const [password, setPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const [repeatPassword, setRepeatPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const {isLoading, register} = useRegister();
  return (
    <RegisterPageStyled>
      <AuthTitle>Регистрация</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль">
        <Input.Password/>
      </Input>
      <Input value={repeatPassword} setValue={setRepeatPassword} placeholder="Пароль" label="Повторить пароль">
        <Input.Password/>
      </Input>
      <AuthButton disabled={isLoading} onClick={() => register(login, password, repeatPassword)}>
        {isLoading ? <Loader/> : 'Войти'}
      </AuthButton>
      <Link to="/login">Войти</Link>
    </RegisterPageStyled>
  );
};

export default RegisterPage;