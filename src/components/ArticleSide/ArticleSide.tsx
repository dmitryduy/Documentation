import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import Article from '../Article/Article';
import ArticleButtons from '../ArticleButtons/ArticleButtons';
import { getArticleMenu } from '../../pages/ArticlePage/ArticlePage.utils/getArticleMenu';
import { useToggle } from '../../hooks/useToggle';
import { useResize } from '../../hooks/useResize';
import { EmitterNames } from '../../emitterNames';
import { IPost } from '../../global.typings';
import Loader from '../../shared/Loader/Loader';
import Error from '../../shared/Error/Error';
import { useEmit } from '../../hooks/useEmit';

import {ArticleSideStyled, Menu} from './ArticleSide.styles';

interface IArticleSideProps {
    post: IPost | null;
    isLoading: boolean;
    isError: boolean;
}

const ArticleSide: React.FC<IArticleSideProps> = ({post, isLoading, isError}) => {
  const [content, toggleContent]  = useToggle(false);
  const width = useResize();
  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => toggleContent());

  if (isError) {
    return <Error/>;
  }

  return (
    !isLoading && post ? <ArticleSideStyled className={cn({transform: content})}>
      <Link className="edit" to={`/edit-post/${post.link}`}>Редактировать</Link>
      <Article markdown={post.markdown}/>
      <ArticleButtons/>
      {post.menu.length && width > 1000 ?
        <Menu>
          {getArticleMenu(post.menu)}
        </Menu> :
        null
      }
    </ArticleSideStyled> :
      <Loader/>
  );
};

export default ArticleSide;