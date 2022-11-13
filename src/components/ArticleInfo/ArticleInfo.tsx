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
      <Label>Автор: {author}</Label>
      <Label>Просмотров: {views}</Label>
      <Label>Опубликовано: {getDateFromString(date)}</Label>
    </ArticleInfoStyled>
  );
};

export default React.memo(ArticleInfo);