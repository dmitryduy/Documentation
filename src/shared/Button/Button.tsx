import React from 'react';

import Loader from '../Loader/Loader';

import { ButtonStyled } from './Button.styles';

interface IButtonProps {
  onClick?: () => void;
  text: string;
  subtitle?: string;
  isLoading?: boolean;
}

const Button: React.FC<IButtonProps> = ({onClick, text, subtitle, isLoading}) => {
  if (isLoading) {
    return (<ButtonStyled disabled>
      <Loader/>
    </ButtonStyled>);
  }

  return (
    <ButtonStyled onClick={onClick}>
      {subtitle && <span className="subtitle">{subtitle}</span>}
      <span className="text">{text}</span>
    </ButtonStyled>
  );
};

export default Button;