import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import AuthTitle from '../../shared/AuthTitle/AuthTitle';
import Input from '../../shared/Input/Input';
import AuthButton from '../../shared/AuthButton/AuthButton';
import Loader from '../../shared/Loader/Loader';
import { useInput } from '../../hooks/useInput';
import { useStores } from '../../hooks/useStores';

import {RegisterPageStyled} from './RegisterPage.styles';
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from './RegisterPage.constants';

const RegisterPage = observer(() => {
  const [login, setLogin] = useInput('', MAX_LOGIN_LENGTH);
  const [password, setPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const [repeatPassword, setRepeatPassword] = useInput('', MAX_PASSWORD_LENGTH);
  const {authStore} = useStores();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from ?? '/article';


  const signUp = () => {
    authStore.signUp(login, password, repeatPassword, () => navigate(from));
  };

  return (
    <RegisterPageStyled>
      <AuthTitle>Регистрация</AuthTitle>
      <Input value={login} setValue={setLogin} placeholder="Логин" label="Логин" type="text"/>
      <Input value={password} setValue={setPassword} placeholder="Пароль" label="Пароль" type="password"/>
      <Input value={repeatPassword} setValue={setRepeatPassword} placeholder="Пароль" label="Еще раз" type="password"/>
      <AuthButton disabled={authStore.isSignUpLoading} onClick={signUp}>
        {authStore.isSignUpLoading ? <Loader/> : 'Зарегестрироваться'}
      </AuthButton>
      <Link className="sign-in" to="/login">Войти</Link>
    </RegisterPageStyled>
  );
});

export default RegisterPage;