import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchRandomPost } from '../../api/fetchRandomPost';
import { IPost } from '../../global.typings';
import InfoAside from '../../components/InfoAside/InfoAside';
import { fetchPost } from '../../api/fetchPost';
import { useAppDispatch } from '../../hooks/useAppSelector';
import { setNextPost, setPostInfo } from '../../reducers/articlesReducer/articlesReducer';
import { fetchNextPost } from '../../api/fetchNextPost';
import { EmitterNames } from '../../emitterNames';
import { Errors } from '../../errors';
import ArticleSide from '../../components/ArticleSide/ArticleSide';

import { ArticlePageStyled } from './ArticlePage.styles';

const ArticlePage = () => {
  const {title} = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    setError(false);
    (title ? fetchPost(title || '') : fetchRandomPost()).then(data => {
      if (data.error) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.BACKEND_ERROR});
      }
      setPost(data.post);
      setLoading(false);
    }).catch(() =>  {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.UNEXPECTED_ERROR});
      setLoading(false);
      setPost(null);
      setError(true);
    });

  }, [title]);

  useLayoutEffect(() => window.scrollTo(0, 0), [post]);

  useEffect(() => {
    if (post) {
      fetchNextPost(post.link)
        .then(data => {
          dispatch(setNextPost({title: data.title || data.error!, link: data.link || data.error!}));
        });
    }
  }, [post]);

  useEffect(() => {
    post && dispatch(setPostInfo({title: post.title, link: post.link}));
  }, [post]);


  return (
    <ArticlePageStyled>
      <InfoAside/>
      <ArticleSide isError={error} isLoading={loading} post={post}/>
    </ArticlePageStyled>
  );
};

export default ArticlePage;