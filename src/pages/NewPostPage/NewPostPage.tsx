import React from 'react';

import EditorWithPreview from '../../shared/EditorWithPreview/EditorWithPreview';

import { useCreatePost } from './NewPostPage.hooks/useCreatePost';

const NewPostPage = () => {
  const [isLoading, createPost] = useCreatePost();

  return (
    <EditorWithPreview isLoading={isLoading} onSubmit={createPost} buttonValue="Добавить статью"/>
  );
};

export default NewPostPage;