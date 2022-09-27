import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import Article from '../Article/Article';
import { getArticleMenu } from '../../pages/ArticlePage/ArticlePage.utils/getArticleMenu';
import { useToggle } from '../../hooks/useToggle';
import { EmitterNames } from '../../emitterNames';
import { IPost } from '../../global.typings';
import Loader from '../../shared/Loader/Loader';
import { useEmit } from '../../hooks/useEmit';
import {ReactComponent as EditSvg} from '../../assets/images/edit.svg';
import { useAppSelector } from '../../hooks/useAppSelector';
import ButtonLink from '../../shared/Button/ButtonLink/ButtonLink';
import useMatchMedia from '../../hooks/useMatchMedia';

import {ArticleSideStyled, Menu} from './ArticleSide.styles';

interface IArticleSideProps {
    post: IPost | null;
    isLoading: boolean;
}

const ArticleSide: React.FC<IArticleSideProps> = ({post, isLoading}) => {
  const [content, toggleContent, setContent]  = useToggle(false);
  const phone = useMatchMedia();
  const nextArticle = useAppSelector(state => state.articles.nextPost);
  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => toggleContent());

  useEffect(() => {
    !phone && setContent(false);
  }, [phone]);

  if (!isLoading && post) {
    return (
      <ArticleSideStyled className={cn({transform: content})}>
        <Article markdown={post.markdown}/>
        <Link className="edit" to={`/edit-post/${post.link}`}><EditSvg/>Редактировать</Link>
        {nextArticle && <ButtonLink link={nextArticle.link} subtitle="Случайная статья" text={nextArticle.title}/>}
        {post.menu.length && !phone ?
          <Menu className="without-scroll">
            {getArticleMenu(post.menu)}
          </Menu> :
          null
        }
      </ArticleSideStyled>
    );
  }

  return <ArticleSideStyled><Loader/></ArticleSideStyled>;
};

export default ArticleSide;