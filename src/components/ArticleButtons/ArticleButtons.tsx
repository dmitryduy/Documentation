import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import ButtonLink from '../../shared/Button/ButtonLink/ButtonLink';

import {ArticleButtonsStyled} from './ArticleButtons.styles';

const ArticleButtons = () => {
  const nextArticle = useAppSelector(state => state.articles.nextPost);
  return (
    <ArticleButtonsStyled>
      {nextArticle && <ButtonLink link={nextArticle.link} subtitle="Случайная статья" text={nextArticle.title}/>}
    </ArticleButtonsStyled>
  );
};

export default ArticleButtons;