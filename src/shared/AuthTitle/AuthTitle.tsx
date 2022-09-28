import React from 'react';

import {AuthTitleStyled} from './AuthTitle.styles';

interface IAuthTitleProps {
    children: React.ReactNode;
}

const AuthTitle: React.FC<IAuthTitleProps> = ({children}) => {
  return (
    <AuthTitleStyled>
      {children}
    </AuthTitleStyled>
  );
};

export default AuthTitle;