import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { EmitterNames } from '../../../emitterNames';
import { sendPost } from '../../../api/sendPost';
import { Errors } from '../../../errors';

export const createPost = (markdown: string, tags: string[]) => {
  const title = getTitleFromMarkdown(markdown);

  if (!title) {
    window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.POST_HEADER_ERROR});
    return;
  }

  if (!tags.length) {
    window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.NO_POST_TAGS_ERROR});
    return;
  }

  sendPost(markdown, tags, title);
};
