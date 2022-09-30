import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { showTooltip } from '../../../utils/showTooltip';
import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { IPost } from '../../../global.typings';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { updatePost } from '../../../reducers/articlesReducer/articlesReducer';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';

export const useUpdatePost = (post: IPost | null):[boolean, (markdown: string) => void] => {
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  const nagivate = useNavigate();
  const dispatch = useAppDispatch();

  const validateAndUpdatePost = (markdown: string) => {
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
    dispatch(updatePost({markdown, menu: getMenuFromMarkdown(markdown), link: post.link, owner: login || ''}))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        nagivate(`/post/${post.link}`);
        showTooltip('Пост обновлен');
      })
      .catch(e => {
        setIsLoading(false);
        showTooltip(e);
      });
  };

  return [isLoading, validateAndUpdatePost];

};
