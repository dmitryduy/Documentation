import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { showTooltip } from '../../../utils/showTooltip';
import { useAppDispatch } from '../../../hooks/useAppSelector';
import { deletePost } from '../../../reducers/articlesReducer/articlesReducer';

export const useDeletePost = () => {
  const {login} = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (link: string) => {
    dispatch(deletePost({owner: login || '', link}))
      .unwrap()
      .then(() => {
        navigate('/');
        showTooltip('Пост удален');
      })
      .catch(showTooltip);
  };
};
