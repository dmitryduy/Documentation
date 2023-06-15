import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { showTooltip } from '../../../utils/showTooltip';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { createPost } from '../../../reducers/articlesReducer/articlesReducer';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';
import { checkPost } from '../NewPostPage.utils/checkPost';
import { MAX_ARTICLE_LENGTH } from '../../../constants';
import { Errors } from '../../../errors';

export const useCreatePost = (): [boolean, (markdown: string, tags: string[]) => void] => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const dispatch = useAppDispatch();

  const checkAndCreatePost = (markdown: string, tags: string[]) => {
    if (markdown.length > MAX_ARTICLE_LENGTH) {
      showTooltip(Errors.ARTICLE_LENGTH_ERROR);
      return;
    }
    const error = checkPost(markdown, tags);
    if (error) {
      showTooltip(error);
      return;
    }

    setIsLoading(true);
    dispatch(createPost({
      markdown,
      tags,
      title: getTitleFromMarkdown(markdown) || '',
      menu: getMenuFromMarkdown(markdown),
      owner: login || ''
    }))
      .unwrap()
      .then(data => {
        navigate(`/post/${data.link}`);
      })
      .catch(showTooltip)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, checkAndCreatePost];
};
