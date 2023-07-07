import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import { useInput } from '../../hooks/useInput';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';
import { useStores } from '../../hooks/useStores';

import {LoginPageStyled} from './LoginPage.styles';

const LoginPage = observer(() => {
  const [login, setLogin] = useInput('');
  const [password, setPassword] = useInput('');
  const {authStore} = useStores();

  return (
    <LoginPageStyled>
      <AuthTitle>Вход</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин" type="text"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль" type="password"/>
      <AuthButton disabled={authStore.isLoading} onClick={() => authStore.signIn(login, password)}>
        {authStore.isLoading ? <Loader/> : 'Войти'}
      </AuthButton>
      <Link className="sign-up" to="/register">Создать аккаунт</Link>
    </LoginPageStyled>
  );
});

export default LoginPage;