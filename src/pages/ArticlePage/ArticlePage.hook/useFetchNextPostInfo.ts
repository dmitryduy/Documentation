import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchNextPost } from '../../../api/fetchNextPost';
import { setNextPost } from '../../../reducers/articlesReducer/articlesReducer';
import { useAppSelector } from '../../../hooks/useAppSelector';

export const useFetchNextPostInfo = () => {
  const post = useAppSelector(state => state.articles.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      fetchNextPost(post.link)
        .then(data => {
          dispatch(setNextPost({title: data.title || data.error!, link: data.link || data.error!}));
        });
    }
  }, [post]);
};