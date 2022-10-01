import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { showTooltip } from '../../../utils/showTooltip';
import { IPost } from '../../../global.typings';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { updatePost } from '../../../reducers/articlesReducer/articlesReducer';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';
import { checkPost } from '../EditPostPage.utils/checkPost';

export const useUpdatePost = (post: IPost | null):[boolean, (markdown: string) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateAndUpdatePost = (markdown: string) => {
    if (!post) return;

    const error = checkPost(markdown, post);

    if (error) {
      showTooltip(error);
      return;
    }

    setIsLoading(true);
    dispatch(updatePost({markdown, menu: getMenuFromMarkdown(markdown), link: post.link, owner: login || ''}))
      .unwrap()
      .then(() => {
        navigate(`/post/${post.link}`);
        showTooltip('Пост обновлен');
      })
      .catch(showTooltip)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, validateAndUpdatePost];

};
