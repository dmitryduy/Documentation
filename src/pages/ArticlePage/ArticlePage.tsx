import React, { useLayoutEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import InfoAside from '@components/InfoAside/InfoAside';
import ArticleSide from '@components/ArticleSide/ArticleSide';
import { ReactComponent as AddSvg } from '@assets/images/add.svg';
import { withHeader } from '@hocs/withHeader';
import { useStores } from '@hooks/useStores';

import { useFetchPost } from './ArticlePage.hook/useFetchPost';
import { ArticlePageStyled } from './ArticlePage.styles';

const ArticlePage = observer(() => {
  const {title} = useParams();
  const {postStore: {post}, authStore: {login}} = useStores();
  useFetchPost(title);

  useLayoutEffect(() => window.scrollTo(0, 0), [post]);

  return (
    <ArticlePageStyled>
      <InfoAside/>
      <ArticleSide/>
      {login &&
      <NavLink className="add-post" to="/article/create">
        <AddSvg/>
      </NavLink>}
    </ArticlePageStyled>
  );
});

export default withHeader(ArticlePage);