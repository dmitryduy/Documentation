import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { showTooltip } from '../../../utils/showTooltip';
import { createPostManager } from '../../../api/postManager/createPostManager';

export const useDeletePost = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  return (link: string) => {
    const postManager = createPostManager();
    postManager.delete({owner: login || '', link})
      .then(() => {
        navigate('/');
        showTooltip('Пост удален');
      })
      .catch(showTooltip);
  };
};
