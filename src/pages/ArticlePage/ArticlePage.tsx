import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { fetchRandomPost } from '../../api/fetchRandomPost';
import { IPost } from '../../global.typings';
import InfoAside from '../../components/InfoAside/InfoAside';
import { fetchPost } from '../../api/fetchPost';
import Article from '../../components/Article/Article';
import ArticleButtons from '../../components/ArticleButtons/ArticleButtons';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { setNextPost, setPostInfo } from '../../reducers/articlesReducer/articlesReducer';
import { fetchNextPost } from '../../api/fetchNextPost';
import Loader from '../../shared/Loader/Loader';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';
import { useToggle } from '../../hooks/useToggle';

import { ArticlePageStyled, Content, Menu } from './ArticlePage.styles';
import { getArticleMenu } from './ArticlePage.utils/getArticleMenu';

interface IArticlePageProps {
  main?: boolean;
}

const ArticlePage: FC<IArticlePageProps> = ({main}) => {
  const {title} = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const dispatch = useAppDispatch();
  const [activeRightSide, toggleActiveSide] = useToggle(false);

  useEmit(EmitterNames.TOGGLE_RIGHT_SIDEBAR, () => toggleActiveSide());

  useEffect(() => {
    if (main) {
      fetchRandomPost().then(setPost);
    } else {
      fetchPost(title || '').then(setPost);
    }

  }, [title]);

  useLayoutEffect(() => window.scrollTo(0, 0), [post]);

  useEffect(() => {
    if (post) {
      fetchNextPost(post.link)
        .then(data => {
          dispatch(setNextPost(data));
        });
    }
  }, [post]);

  useEffect(() => {
    post && dispatch(setPostInfo({title: post.title, link: post.link}));
  }, [post]);


  return (
    post ?
      <ArticlePageStyled>
        <InfoAside/>
        <Content>
          <Article markdown={post.markdown}/>
          <ArticleButtons/>
        </Content>
        {post.menu.length ?
          <Menu className={cn({active: activeRightSide})}>
            {getArticleMenu(post.menu)}
          </Menu> :
          null
        }
      </ArticlePageStyled> :
      <Loader/>
  );
};

export default ArticlePage;