import React from 'react';

import { ButtonStyled } from './Button.styles';

interface IButtonProps {
  onClick?: () => void;
  text: string;
  subtitle: string;
}

const Button: React.FC<IButtonProps> = ({onClick, text, subtitle}) => {
  return (
    <ButtonStyled onClick={onClick}>
      <span className="subtitle">{subtitle}</span>
      <span className="text">{text}</span>
    </ButtonStyled>
  );
};

export default Button;