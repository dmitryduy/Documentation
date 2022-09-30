import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { Errors } from '../../../errors';
import { useConnection } from '../../../hooks/useConnection';
import { showTooltip } from '../../../utils/showTooltip';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { createPost } from '../../../reducers/articlesReducer/articlesReducer';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';

export const useCreatePost = (): [boolean, (markdown: string, tags: string[]) => void] => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useConnection();
  const {login} = useAuth();
  const dispatch = useAppDispatch();

  const checkAndCreatePost = (markdown: string, tags: string[]) => {
    const title = getTitleFromMarkdown(markdown);

    if (!title) {
      showTooltip(Errors.POST_HEADER_ERROR);
      return;
    }

    if (!tags.length) {
      showTooltip(Errors.NO_POST_TAGS_ERROR);
      return;
    }
    if (!isOnline) {
      showTooltip(Errors.NO_CONNECTION);
      return;
    }
    setIsLoading(true);
    dispatch(createPost({markdown, tags, title, menu: getMenuFromMarkdown(markdown), owner: login || ''}))
      .unwrap()
      .then(data => {
        setIsLoading(false);
        navigate(`/post/${data.link}`);
      })
      .catch(e => {
        setIsLoading(false);
        showTooltip(e);
      });
  };

  return [isLoading, checkAndCreatePost];
};
