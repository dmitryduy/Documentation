import { useNavigate } from 'react-router-dom';

import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { EmitterNames } from '../../../emitterNames';
import { Errors } from '../../../errors';
import { sendPost } from '../../../api/sendPost';

export const useCreatePost = () => {
  const navigate = useNavigate();
  return (markdown: string, tags: string[]) => {
    const title = getTitleFromMarkdown(markdown);

    if (!title) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.POST_HEADER_ERROR});
      return;
    }

    if (!tags.length) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.NO_POST_TAGS_ERROR});
      return;
    }

    return sendPost(markdown, tags, title)
      .then(data => {
        if (data.link) {
          navigate(`/post/${data.link}`);
        }
      })
      .catch(e => {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: e.response.data.error});
      });
  };
};
