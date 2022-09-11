import React from 'react';

import { LinkStyled } from './Link.styles';

interface ILinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<ILinkProps> = ({href, children}) => {
  return (
    <LinkStyled href={href} target="_blank">{children}</LinkStyled>
  );
};

export default Link;