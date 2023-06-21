import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { showTooltip } from '../../../utils/showTooltip';
import { IPost } from '../../../global.typings';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';
import { checkPost } from '../EditPostPage.utils/checkPost';
import { MAX_ARTICLE_LENGTH } from '../../../constants';
import { Errors } from '../../../errors';
import { createPostManager } from '../../../api/postManager/createPostManager';

export const useUpdatePost = (post: IPost | null):[boolean, (markdown: string) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const validateAndUpdatePost = (markdown: string) => {
    if (!post) return;

    if (markdown.length > MAX_ARTICLE_LENGTH) {
      showTooltip(Errors.ARTICLE_LENGTH_ERROR);
      return;
    }

    const error = checkPost(markdown, post);

    if (error) {
      showTooltip(error);
      return;
    }

    setIsLoading(true);

    const postManager = createPostManager();
    postManager.update({
      markdown,
      menu: getMenuFromMarkdown(markdown),
      link: post.link,
      owner: login || ''
    }).then(() => {
      navigate(`/post/${post.link}`);
      showTooltip('Пост обновлен');
    })
      .catch(showTooltip)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, validateAndUpdatePost];

};
