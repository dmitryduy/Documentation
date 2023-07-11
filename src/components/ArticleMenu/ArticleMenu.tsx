import React from 'react';
import { getArticleMenu } from '@pages/ArticlePage/ArticlePage.utils/getArticleMenu';

import {ArticleMenuStyled} from './ArticleMenu.styles';

import { Menu } from '@/global.typings';

interface IArticleMenuProps {
    menu: Menu;
}

const ArticleMenu: React.FC<IArticleMenuProps> = ({menu}) => {
  return (
    <ArticleMenuStyled>
      {getArticleMenu(menu)}
    </ArticleMenuStyled>
  );
};

export default React.memo(ArticleMenu);