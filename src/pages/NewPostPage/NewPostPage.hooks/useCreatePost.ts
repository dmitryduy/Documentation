import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { EmitterNames } from '../../../emitterNames';
import { Errors } from '../../../errors';
import { sendPost } from '../../../api/sendPost';
import { useConnection } from '../../../hooks/useConnection';
import { showTooltip } from '../../../utils/showTooltip';

export const useCreatePost = (): [boolean, (markdown: string, tags: string[]) => void] => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isOnline = useConnection();

  const createPost = (markdown: string, tags: string[]) => {
    const title = getTitleFromMarkdown(markdown);

    if (!title) {
      showTooltip(Errors.POST_HEADER_ERROR);
      return;
    }

    if (!tags.length) {
      showTooltip(Errors.NO_POST_TAGS_ERROR);
      return;
    }
    if (!isOnline) {
      showTooltip(Errors.NO_CONNECTION);
      return;
    }
    setIsLoading(true);
    sendPost(markdown, tags, title)
      .then(data => {
        setIsLoading(false);
        if (data.link) {
          navigate(`/post/${data.link}`);
        }
      })
      .catch(e => {
        setIsLoading(false);
        const backendError = e.response && e.response.data && e.response.data.error;
        showTooltip(backendError || Errors.UNEXPECTED_ERROR);
      });
  };

  return [isLoading, createPost];
};
