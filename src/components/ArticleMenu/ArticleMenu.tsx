import React from 'react';

import { Menu } from '../../global.typings';
import { getArticleMenu } from '../../pages/ArticlePage/ArticlePage.utils/getArticleMenu';

import {ArticleMenuStyled} from './ArticleMenu.styles';

interface IArticleMenuProps {
    menu: Menu;
}

const ArticleMenu: React.FC<IArticleMenuProps> = ({menu}) => {
  console.log(menu);
  return (
    <ArticleMenuStyled>
      {getArticleMenu(menu)}
    </ArticleMenuStyled>
  );
};

export default React.memo(ArticleMenu);