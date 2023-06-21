import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getTitleFromMarkdown } from '../../../utils/getTitleFromMarkdown';
import { showTooltip } from '../../../utils/showTooltip';
import { useAuth } from '../../../hooks/useAuth';
import { getMenuFromMarkdown } from '../../../utils/getMenuFromMarkdown';
import { createPostManager } from '../../../api/postManager/createPostManager';

export const useCreatePost = (): [boolean, (markdown: string, tags: string[]) => void] => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();

  const checkAndCreatePost = (markdown: string, tags: string[]) => {
    const postManager = createPostManager();
    setIsLoading(true);

    postManager.create({
      markdown,
      tags,
      title: getTitleFromMarkdown(markdown) || '',
      menu: getMenuFromMarkdown(markdown),
      owner: login || ''
    }).then(data => navigate(`/post/${data.link}`))
      .catch(showTooltip)
      .finally(() => setIsLoading(false));
  };

  return [isLoading, checkAndCreatePost];
};
