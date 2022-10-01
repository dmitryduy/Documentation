import React from 'react';

import {AuthButtonStyled} from './AuthButton.styles';

interface IAuthButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled: boolean;
}

const AuthButton: React.FC<IAuthButtonProps> = ({onClick, children, disabled}) => {
  return (
    <AuthButtonStyled onClick={onClick} disabled={disabled}>
      {children}
    </AuthButtonStyled>
  );
};

export default AuthButton;