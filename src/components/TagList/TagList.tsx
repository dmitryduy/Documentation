import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ITagList } from '../../global.typings';
import { useToggle } from '../../hooks/useToggle';
import { EmitterNames } from '../../emitterNames';
import { useHeightAnimate } from '../../hooks/useHeightAnimate';
import useMatchMedia from '../../hooks/useMatchMedia';

import { Header, TagListStyled } from './TagList.styles';

interface ITagListProps {
  tagInfo: ITagList;
}

const TagList: React.FC<ITagListProps> = ({tagInfo}) => {
  const [active, toggleActive] = useToggle(true);
  const listRef = useHeightAnimate<HTMLUListElement>(active);
  const phone = useMatchMedia();


  const closeLeftSide = () => {
    phone && window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
  };

  return (
    <TagListStyled>
      <Header className={cn({active})} onClick={toggleActive}>
        <h4 className="tag">{tagInfo.tagName}</h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
        </svg>
      </Header>
      <ul ref={listRef} className={cn('article-list', {active})}>
        {tagInfo.articles.map(article =>
          <li className="article-title" key={article.link}>
            <Link to={`/post/${article.link}`} onClick={closeLeftSide}>
              {article.title}
            </Link>
          </li>
        )}
      </ul>
    </TagListStyled>
  );
};

export default TagList;