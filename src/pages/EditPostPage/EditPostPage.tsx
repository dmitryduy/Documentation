import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';
import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';
import { useAppSelector } from '../../hooks/useAppSelector';
import { withHeader } from '../../hocs/withHeader';

import { useUpdatePost } from './EditPostPage.hook/useUpdatePost';


const EditPostPage = () => {
  const {title} = useParams();
  const post = useAppSelector(state => state.posts.post);
  const navigate = useNavigate();
  const [isLoading, updatePost] = useUpdatePost(post);

  useEffect(() => {
    if (!post || title !== post.link) {
      navigate('/Documentation');
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

export default withHeader(EditPostPage);