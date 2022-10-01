import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { Errors } from '../../../errors';

export const checkPost = (markdown: string, tags: string[]) => {
  const title = getTitleFromMarkdown(markdown);

  if (!title) {
    return Errors.POST_HEADER_ERROR;
  }
  if (!tags.length) {
    return Errors.NO_POST_TAGS_ERROR;
  }
  return null;
};
