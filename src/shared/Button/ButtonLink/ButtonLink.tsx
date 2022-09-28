import React from 'react';
import { Link } from 'react-router-dom';

import { ButtonStyled } from '../Button.styles';

interface IButtonLinkProps {
  text: string;
  subtitle: string;
  link: string;
}

const ButtonLink: React.FC<IButtonLinkProps> = ({text, subtitle, link}) => {
  return (
    <Link to={`/Documentation/post/${link}`}>
      <ButtonStyled>
        <span className="subtitle">{subtitle}</span>
        <span className="text">{text}</span>
      </ButtonStyled>
    </Link>
  );
};

export default ButtonLink;