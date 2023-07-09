import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Loader from '../../shared/Loader/Loader';
import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';
import { withHeader } from '../../hocs/withHeader';
import { useStores } from '../../hooks/useStores';
import { withAuth } from '../../hocs/withAuth';

import { useUpdatePost } from './EditPostPage.hook/useUpdatePost';


const EditPostPage = observer(() => {
  const {title} = useParams();
  const {postStore: {post}} = useStores();
  const navigate = useNavigate();
  const [isLoading, updatePost] = useUpdatePost(post);

  useEffect(() => {
    if (!post || title !== post.link) {
      navigate('/article');
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
});

export default withAuth(withHeader(EditPostPage));