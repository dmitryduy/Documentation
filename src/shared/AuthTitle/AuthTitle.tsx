import React from 'react';

import {AuthTitleStyled} from './AuthTitle.styles';

interface IAuthTitleProps {
    children: string;
}

const AuthTitle: React.FC<IAuthTitleProps> = ({children}) => {
  return (
    <AuthTitleStyled>
      {children}
    </AuthTitleStyled>
  );
};

export default AuthTitle;