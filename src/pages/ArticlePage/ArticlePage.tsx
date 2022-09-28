import React, { useLayoutEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import InfoAside from '../../components/InfoAside/InfoAside';
import { useAppSelector } from '../../hooks/useAppSelector';
import ArticleSide from '../../components/ArticleSide/ArticleSide';
import { ReactComponent as AddSvg } from '../../assets/images/add.svg';

import { useFetchPost } from './ArticlePage.hook/useFetchPost';
import { ArticlePageStyled } from './ArticlePage.styles';
import { useFetchNextPostInfo } from './ArticlePage.hook/useFetchNextPostInfo';

const ArticlePage = () => {
  const {title} = useParams();
  const post = useAppSelector(state => state.articles.post);
  const isLoading = useFetchPost(title);

  useLayoutEffect(() => window.scrollTo(0, 0), [post]);
  useFetchNextPostInfo();

  return (
    <ArticlePageStyled>
      <InfoAside/>
      <ArticleSide isLoading={isLoading} post={post}/>
      <NavLink className="add-post" to="/create-post">
        <AddSvg/>
      </NavLink>
    </ArticlePageStyled>
  );
};

export default ArticlePage;