import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import Article from '../Article/Article';
import { EmitterNames } from '../../emitterNames';
import Loader from '../../shared/Loader/Loader';
import { useEmit } from '../../hooks/useEmit';
import {ReactComponent as EditSvg} from '../../assets/images/edit.svg';
import {ReactComponent as DeleteSvg} from '../../assets/images/delete.svg';
import { useAppSelector } from '../../hooks/useAppSelector';
import ButtonLink from '../../shared/Button/ButtonLink/ButtonLink';
import useMatchMedia from '../../hooks/useMatchMedia';
import { useAuth } from '../../hooks/useAuth';
import { showTooltip } from '../../utils/showTooltip';
import ArticleMenu from '../ArticleMenu/ArticleMenu';
import ArticleInfo from '../ArticleInfo/ArticleInfo';

import {ArticleSideStyled, Actions} from './ArticleSide.styles';
import { useDeletePost } from './ArticleSide.hook/useDeletePost';


const ArticleSide = () => {
  const [isHide, setIsHide]  = useState(false);
  const phone = useMatchMedia();
  const { nextPost, post, loading} = useAppSelector(state => state.articles);
  const {login} = useAuth();
  const deletePost = useDeletePost();
  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => setIsHide(prev => !prev));

  useEffect(() => {
    !phone && setIsHide(false);
  }, [phone]);

  const onDeleteClick = () => {
    showTooltip('Нажмите дважды, чтобы удалить статью');
  };

  const onDeleteDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    post && deletePost(post?.link);
  };

  if (!loading && post) {
    return (
      <ArticleSideStyled className={cn({transform: isHide})}>
        <ArticleInfo author={post.owner} views={post.views} date={post.date}/>
        <Article markdown={post.markdown}/>
        {post.owner === login &&
        <Actions>
          <Link className="edit" to={`/edit-post/${post.link}`}><EditSvg/>Редактировать</Link>
          <span className="delete" onClick={onDeleteClick} onDoubleClick={onDeleteDoubleClick}>
            <DeleteSvg/>Удалить
          </span>
        </Actions>}
        {nextPost && <ButtonLink link={nextPost.link} subtitle="Случайная статья" text={nextPost.title}/>}
        {post.menu.length && !phone ?
          <ArticleMenu menu={post.menu}/> :
          null
        }
      </ArticleSideStyled>
    );
  }

  if (loading) {
    return <ArticleSideStyled><Loader/></ArticleSideStyled>;
  }

  return <p>Что то пошло не так.</p>;

};

export default ArticleSide;