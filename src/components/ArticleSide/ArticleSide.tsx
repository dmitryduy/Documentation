import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import Article from '../Article/Article';
import { useToggle } from '../../hooks/useToggle';
import { EmitterNames } from '../../emitterNames';
import { IPost } from '../../global.typings';
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

import {ArticleSideStyled, Actions} from './ArticleSide.styles';
import { useDeletePost } from './ArticleSide.hook/useDeletePost';

interface IArticleSideProps {
    post: IPost | null;
    isLoading: boolean;
}

const ArticleSide: React.FC<IArticleSideProps> = ({post, isLoading}) => {
  const [content, toggleContent, setContent]  = useToggle(false);
  const phone = useMatchMedia();
  const nextArticle = useAppSelector(state => state.articles.nextPost);
  const {login} = useAuth();
  const {isDeleted, removePost} = useDeletePost();
  const navigate = useNavigate();
  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => toggleContent());

  useEffect(() => {
    !phone && setContent(false);
  }, [phone]);

  const onDeleteClick = () => {
    showTooltip('Нажмите дважды, чтобы удалить статью');
  };

  const onDeleteDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (post) {
      removePost(post?.link);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      navigate('/');
    }
  }, [isDeleted]);

  if (!isLoading && post) {
    return (
      <ArticleSideStyled className={cn({transform: content})}>
        <Article markdown={post.markdown}/>
        {post.owner === login && <Actions>
          <Link className="edit" to={`/edit-post/${post.link}`}><EditSvg/>Редактировать</Link>
          <span className="delete" onClick={onDeleteClick} onDoubleClick={onDeleteDoubleClick}>
            <DeleteSvg/>Удалить
          </span>
        </Actions>}
        {nextArticle && <ButtonLink link={nextArticle.link} subtitle="Случайная статья" text={nextArticle.title}/>}
        {post.menu.length && !phone ?
          <ArticleMenu menu={post.menu}/> :
          null
        }
      </ArticleSideStyled>
    );
  }

  return <ArticleSideStyled><Loader/></ArticleSideStyled>;
};

export default ArticleSide;