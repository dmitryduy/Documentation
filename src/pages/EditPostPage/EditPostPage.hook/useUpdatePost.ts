import { useNavigate } from 'react-router-dom';

import { showTooltip } from '../../../utils/showTooltip';
import { IPost } from '../../../global.typings';
import { checkPost } from '../EditPostPage.utils/checkPost';
import { MAX_ARTICLE_LENGTH } from '../../../constants';
import { Errors } from '../../../errors';
import { useStores } from '../../../hooks/useStores';
import { conditionalExecution } from '../../../utils/conditionalExecution';

export const useUpdatePost = (post: IPost | null): [boolean, (markdown: string) => void] => {
  const {postStore, authStore: {login}} = useStores();
  const navigate = useNavigate();

  const validateAndUpdatePost = (markdown: string) => {
    if (!post || !login) return;

    if (markdown.length > MAX_ARTICLE_LENGTH) {
      showTooltip(Errors.ARTICLE_LENGTH_ERROR);
      return;
    }

    const error = checkPost(markdown, post);

    conditionalExecution(!!error,
      () => showTooltip(error as string),
      () => {
        postStore.updatePost(markdown, post.link, login, () => {
          showTooltip('Пост обновлен');
          navigate(`/post/${post.link}`);
        });
      });
  };

  return [postStore.isLoading, validateAndUpdatePost];

};
