import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NewPostPage from '../NewPostPage/NewPostPage';
import { fetchPost } from '../../api/fetchPost';
import { IPost } from '../../global.typings';
import Loader from '../../shared/Loader/Loader';
import { getTitleFromMarkdown } from '../../utils/getTitleFromMarkdown';
import { EmitterNames } from '../../emitterNames';
import { updatePostBackend } from '../../api/updatePost';
import { Errors } from '../../errors';


const EditPostPage = () => {
  const {title} = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const nagivate = useNavigate();

  useEffect(() => {
    if (title) {
      fetchPost(title).then(data => {
        if (data.error) {
          window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.BACKEND_ERROR});
        }
        setPost(data.post);
      });
    }
  }, [title]);

  const updateArticle = (markdown: string) => {
    if (markdown === post?.markdown) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Отредактируйте пост'});
      return;
    }
    const title = getTitleFromMarkdown(markdown);
    if (title !== post?.title) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Нельзя менять заголовок статьи'});
      return;
    }

    updatePostBackend(markdown, post.link)
      .then(() => nagivate(`/post/${post.link}`))
      .catch(() =>
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Ошибка обновления поста. Попробуйте позже.'}));
  };


  return post ?
    <NewPostPage updateArticle={updateArticle} markdownTemplate={post.markdown} buttonValue="Редактировать"/> :
    <Loader/>;
};

export default EditPostPage;