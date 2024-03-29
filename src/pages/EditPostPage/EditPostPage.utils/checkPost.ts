import { getTitleFromMarkdown } from '@utils/getTitleFromMarkdown';

import { POST_TITLE_ERROR, UNCHANGED_POST } from '../EditPostPage.constants';

import { IPost } from '@/global.typings';

export const checkPost = (newMarkdown: string, post: IPost | null) => {
  if (newMarkdown === post?.markdown) {
    return UNCHANGED_POST;
  }

  const title = getTitleFromMarkdown(newMarkdown);
  if (title !== post?.title) {
    return POST_TITLE_ERROR;
  }
  return null;
};
