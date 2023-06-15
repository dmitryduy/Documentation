import React from 'react';

import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';
import { withHeader } from '../../hocs/withHeader';

import { useCreatePost } from './NewPostPage.hook/useCreatePost';

const NewPostPage = () => {
  const [isLoading, createPost] = useCreatePost();

  return (
    <EditorWithPreview
      defaultMarkdown="# Заголовок"
      isLoading={isLoading}
      onSubmit={createPost}
      buttonValue="Добавить статью"/>
  );
};

export default withHeader(NewPostPage);