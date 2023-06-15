import React from 'react';

import { getDateFromString } from '../../utils/getDateFromString';

import {ArticleInfoStyled, Label} from './ArticleInfo.styles';

interface IArticleInfoProps {
    author: string;
    views: number;
    date: string;
}

const ArticleInfo: React.FC<IArticleInfoProps> = ({views, author, date}) => {
  return (
    <ArticleInfoStyled>
      <Label>Автор <span>{author}</span></Label>
      <Label>Просмотров <span>{views}</span></Label>
      <Label>Опубликовано <span>{getDateFromString(date)}</span></Label>
    </ArticleInfoStyled>
  );
};

export default React.memo(ArticleInfo);