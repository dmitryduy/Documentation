import { useNavigate } from 'react-router-dom';
import { useStores } from '@hooks/useStores';
import { conditionalExecution } from '@utils/conditionalExecution';
import { showToast } from '@utils/showToast';

import { checkPost } from '../EditPostPage.utils/checkPost';

import { IPost } from '@/global.typings';
import { MAX_ARTICLE_LENGTH } from '@/constants';
import { Errors } from '@/errors';


export const useUpdatePost = (post: IPost | null): [boolean, (markdown: string) => void] => {
  const {postStore, authStore: {login}} = useStores();
  const navigate = useNavigate();

  const validateAndUpdatePost = (markdown: string) => {
    if (!post || !login) return;

    if (markdown.length > MAX_ARTICLE_LENGTH) {
      showToast(Errors.ARTICLE_LENGTH_ERROR);
      return;
    }

    const error = checkPost(markdown, post);

    conditionalExecution(!!error,
      () => showToast(error),
      () => {
        postStore.updatePost(markdown, post.link, login, () => {
          showToast('Пост обновлен');
          navigate(`/article/${post.link}`);
        });
      });
  };

  return [postStore.isLoading, validateAndUpdatePost];

};
