import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchPost } from '../../api/fetchPost';
import Loader from '../../shared/Loader/Loader';
import { Errors } from '../../errors';
import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';
import { showTooltip } from '../../utils/showTooltip';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { setPostInfo } from '../../reducers/articlesReducer/articlesReducer';
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
      fetchPost(title).then(data => {
        if (data.error) {
          showTooltip(Errors.BACKEND_ERROR);
          return;
        }
        if (data.post?.owner === login) {
          dispatch(setPostInfo(data.post));
        } else {
          navigate('/Documentation');
        }
      }).catch(() => showTooltip(Errors.UNEXPECTED_ERROR));
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