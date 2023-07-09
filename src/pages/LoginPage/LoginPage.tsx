import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from ?? '/article';

  const signIn = () => {
    authStore.signIn(login, password, () => navigate(from));
  };

  return (
    <LoginPageStyled>
      <AuthTitle>Вход</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин" type="text"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль" type="password"/>
      <AuthButton disabled={authStore.isSignInLoading} onClick={signIn}>
        {authStore.isSignInLoading ? <Loader/> : 'Войти'}
      </AuthButton>
      <Link className="sign-up" to="/register">Создать аккаунт</Link>
    </LoginPageStyled>
  );
});

export default LoginPage;