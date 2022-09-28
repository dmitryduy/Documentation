import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { showTooltip } from '../../../utils/showTooltip';
import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { updatePostBackend } from '../../../api/updatePost';
import { Errors } from '../../../errors';
import { IPost } from '../../../global.typings';
import { useAuth } from '../../../hooks/useAuth';

export const useUpdatePost = (post: IPost | null):[boolean, (markdown: string) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const nagivate = useNavigate();

  const updatePost = (markdown: string) => {
    if (markdown === post?.markdown) {
      showTooltip('Отредактируйте пост');
      return;
    }
    const title = getTitleFromMarkdown(markdown);
    if (title !== post?.title) {
      showTooltip('Нельзя менять заголовок статьи');
      return;
    }
    setIsLoading(true);
    updatePostBackend(markdown, post.link, login || '')
      .then(() => {
        setIsLoading(false);
        nagivate(`/post/${post.link}`);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
        showTooltip(Errors.BACKEND_ERROR);
      });
  };

  return [isLoading, updatePost];

};
