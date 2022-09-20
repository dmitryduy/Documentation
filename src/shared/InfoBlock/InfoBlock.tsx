import React from 'react';

import { InfoBlockType } from '../../global.typings';
import { icons } from '../../icons';

import { InfoBlockStyled, Header } from './InfoBlock.styles';

interface IInfoBlockProps {
  type: InfoBlockType;
  title: string;
  children: React.ReactNode;
}

const InfoBlock: React.FC<IInfoBlockProps> = ({type, children, title}) => {
  return (
    <InfoBlockStyled className={type}>
      <Header>
        {icons[type]}
        <p className="title">{title}</p>
      </Header>
      {children}
    </InfoBlockStyled>
  );
};

export default InfoBlock;