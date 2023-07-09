import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Article from '../Article/Article';
import Loader from '../../shared/Loader/Loader';
import {ReactComponent as EditSvg} from '../../assets/images/edit.svg';
import {ReactComponent as DeleteSvg} from '../../assets/images/delete.svg';
import ButtonLink from '../../shared/Button/ButtonLink/ButtonLink';
import useMatchMedia from '../../hooks/useMatchMedia';
import ArticleMenu from '../ArticleMenu/ArticleMenu';
import ArticleInfo from '../ArticleInfo/ArticleInfo';
import { useStores } from '../../hooks/useStores';
import postStore from '../../stores/postStore';
import { eventManager, Event } from '../../utils/emitter';
import { showToast } from '../../utils/showToast';

import {ArticleSideStyled, Actions} from './ArticleSide.styles';

const ArticleSide = observer(() => {
  const [isHide, setIsHide]  = useState(false);
  const phone = useMatchMedia();
  const navigate = useNavigate();
  const {authStore: {login}, postStore: {nextPost, post, isLoading}} = useStores();

  useEffect(() => eventManager.on(Event.TOGGLE_LEFT_SIDEBAR, () => setIsHide(prev => !prev)), []);

  useEffect(() => {
    !phone && setIsHide(false);
  }, [phone]);

  const onDeleteClick = () => {
    showToast('Нажмите дважды, чтобы удалить статью');
  };

  const onDeleteDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (post && login) {
      postStore.deletePost(post?.link, login, () => {
        navigate('/article');
        showToast('Пост удален');
      });
    }
  };

  if (!isLoading && post) {
    return (
      <ArticleSideStyled className={cn({transform: isHide})}>
        <ArticleInfo author={post.owner} views={post.views} date={post.date}/>
        <Article markdown={post.markdown}/>
        {post.owner === login &&
        <Actions>
          <Link className="edit" to={`/article/edit/${post.link}`}><EditSvg/>Редактировать</Link>
          <span className="delete" onClick={onDeleteClick} onDoubleClick={onDeleteDoubleClick}>
            <DeleteSvg/>Удалить
          </span>
        </Actions>}
        {nextPost && <ButtonLink link={`/article/${nextPost.link}`} subtitle="Случайная статья" text={nextPost.title}/>}
        {post.menu.length && !phone ?
          <ArticleMenu menu={post.menu}/> :
          null
        }
      </ArticleSideStyled>
    );
  }

  if (isLoading) {
    return <ArticleSideStyled><Loader/></ArticleSideStyled>;
  }

  return <p>Что то пошло не так.</p>;

});

export default ArticleSide;