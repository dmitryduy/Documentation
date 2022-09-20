import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { useResize } from '../../hooks/useResize';

import { ArticlePageStyled, Content, Menu } from './ArticlePage.styles';
import { getArticleMenu } from './ArticlePage.utils/getArticleMenu';

interface IArticlePageProps {
  main?: boolean;
}

const ArticlePage: FC<IArticlePageProps> = ({main}) => {
  const {title} = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const dispatch = useAppDispatch();
  const [content, toggleContent]  = useToggle(false);
  const width = useResize();

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
  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => toggleContent());

  useEffect(() => {
    post && dispatch(setPostInfo({title: post.title, link: post.link}));
  }, [post]);


  return (
    post ?
      <ArticlePageStyled>
        <InfoAside/>
        <Content className={cn({transform: content})}>
          <Link className="edit" to={`/edit-post/${post.link}`}>Редактировать</Link>
          <Article markdown={post.markdown}/>
          <ArticleButtons/>
        </Content>
        {post.menu.length && width > 1000 ?
          <Menu>
            {getArticleMenu(post.menu)}
          </Menu> :
          null
        }
      </ArticlePageStyled> :
      <Loader/>
  );
};

export default ArticlePage;