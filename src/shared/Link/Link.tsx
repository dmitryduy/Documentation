import React from 'react';
import { HashLink } from 'react-router-hash-link';

import { LinkStyled } from './Link.styles';

interface ILinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<ILinkProps> = ({href, children}) => {
  if (href.startsWith('#')) {
    return (
      <HashLink to={href.replace(/^#\/post/, '/article')}>
        <LinkStyled as="span">{children}</LinkStyled>
      </HashLink>
    );
  }

  return (
    <LinkStyled href={href} target="_blank">{children}</LinkStyled>
  );
};

export default Link;