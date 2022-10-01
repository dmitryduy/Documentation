import React from 'react';
import { Link } from 'react-router-dom';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import { useInput } from '../../hooks/useInput';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';

import {LoginPageStyled} from './LoginPage.styles';
import { useSignUp } from './LoginPage.hook/useSignUp';

const LoginPage = () => {
  const [login, setLogin] = useInput('');
  const [password, setPassword] = useInput('');
  const {isLoading, signUp} = useSignUp();

  return (
    <LoginPageStyled>
      <AuthTitle>Вход</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин" type="text"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль" type="password"/>
      <AuthButton disabled={isLoading} onClick={() => signUp(login, password)}>
        {isLoading ? <Loader/> : 'Войти'}
      </AuthButton>
      <Link className="sign-up" to="/register">Создать аккаунт</Link>
    </LoginPageStyled>
  );
};

export default LoginPage;