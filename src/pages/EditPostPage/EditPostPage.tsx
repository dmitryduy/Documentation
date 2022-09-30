import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';
import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';
import { showTooltip } from '../../utils/showTooltip';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { findPost } from '../../reducers/articlesReducer/articlesReducer';
import { useAuth } from '../../hooks/useAuth';

import { useUpdatePost } from './EditPostPage.hook/useUpdatePost';


const EditPostPage = () => {
  const {title} = useParams();
  const post = useAppSelector(state => state.articles.post);
  const {login}  = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, updatePost] = useUpdatePost(post);

  useEffect(() => {
    if (title && title !== post?.title) {
      dispatch(findPost({
        params: {
          link: title
        }
      }))
        .unwrap()
        .then(data => {
          if (data.post.owner !== login) {
            navigate('/Documentation');
          }
        })
        .catch(showTooltip);
    }
  }, [title]);


  return post ?
    <EditorWithPreview
      isLoading={isLoading}
      onSubmit={updatePost}
      defaultMarkdown={post.markdown}
      buttonValue="Редактировать"
    /> :
    <Loader/>;
};

export default EditPostPage;