import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ITagList } from '../../global.typings';
import { useToggle } from '../../hooks/useToggle';

import { TagListStyled, Header } from './TagList.styles';

interface ITagListProps {
  tagInfo: ITagList;
}

const TagList: React.FC<ITagListProps> = ({tagInfo}) => {
  const [active, toggleActive] = useToggle(true);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    listRef.current.style.maxHeight = active ? `${listRef.current.scrollHeight}px` : '0';
  }, [active]);

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
          <li className="article-title" key={article.title}>
            <Link to={`/post/${article.link}`}>
              {article.title}
            </Link>
          </li>
        )}
      </ul>
    </TagListStyled>
  );
};

export default TagList;