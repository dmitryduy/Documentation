import React from 'react';

import { InfoBlockStyled, Header } from './InfoBlock.styles';

import { InfoBlockType } from '@/global.typings';
import { icons } from '@/icons';


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