import React from 'react';
import { Link } from 'react-router-dom';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import { useInput } from '../../hooks/useInput';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';

import {LoginPageStyled} from './LoginPage.styles';
import { useLogin } from './LoginPage.hook/useLogin';

const LoginPage = () => {
  const [login, setLogin] = useInput('');
  const [password, setPassword] = useInput('');
  const {isLoading, signUp} = useLogin();

  return (
    <LoginPageStyled>
      <AuthTitle>Вход</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль">
        <Input.Password/>
      </Input>
      <AuthButton disabled={isLoading} onClick={() => signUp(login, password)}>
        {isLoading ? <Loader/> : 'Войти'}
      </AuthButton>
      <Link to="/register">Создать аккаунт</Link>
    </LoginPageStyled>
  );
};

export default LoginPage;