import React from 'react';
import { Link } from 'react-router-dom';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';
import { useInput } from '../../hooks/useInput';

import {RegisterPageStyled} from './RegisterPage.styles';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from './RegisterPage.constants';
import { useSignIn } from './RegisterPage.hook/useSignIn';


const RegisterPage = () => {
  const [login, setLogin] = useInput('', MAX_LOGIN_LENGTH);
  const [password, setPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const [repeatPassword, setRepeatPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const {isLoading, register} = useSignIn();

  return (
    <RegisterPageStyled>
      <AuthTitle>Регистрация</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин" type="text"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль" type="password"/>
      <Input value={repeatPassword} setValue={setRepeatPassword} placeholder="Пароль" label="Еще раз" type="password"/>
      <AuthButton disabled={isLoading} onClick={() => register(login, password, repeatPassword)}>
        {isLoading ? <Loader/> : 'Зарегестрироваться'}
      </AuthButton>
      <Link className="sign-in" to="/login">Войти</Link>
    </RegisterPageStyled>
  );
};

export default RegisterPage;