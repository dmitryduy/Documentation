import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import EditorWithPreview from '@shared/EditorWithPreview/EditorWithPreview';
import { withHeader } from '@hocs/withHeader';
import { useStores } from '@hooks/useStores';
import { withAuth } from '@hocs/withAuth';


const NewPostPage = observer(() => {
  const {postStore, authStore: {login}} = useStores();
  const navigate = useNavigate();

  const createPost = (markdown: string, tags: string[]) => {
    postStore.createPost(markdown, tags, login || '', data => navigate(`/article/${data.link}`));
  };

  return (
    <EditorWithPreview
      defaultMarkdown="# Заголовок"
      isLoading={postStore.isLoading}
      onSubmit={createPost}
      buttonValue="Добавить статью"/>
  );
});

export default withAuth(withHeader(NewPostPage));