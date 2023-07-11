import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useToggle } from '@hooks/useToggle';
import { useHeightAnimate } from '@hooks/useHeightAnimate';
import useMatchMedia from '@hooks/useMatchMedia';
import {ReactComponent as ArrowSvg} from '@assets/images/arrow.svg';
import { eventManager, Event } from '@utils/emitter';

import { Header, TagListStyled } from './TagList.styles';

import { ITagList } from '@/global.typings';

interface ITagListProps {
  tagInfo: ITagList;
}

const TagList: React.FC<ITagListProps> = ({tagInfo}) => {
  const [isActive, toggleIsActive] = useToggle(false);
  const listRef = useHeightAnimate<HTMLUListElement>(isActive);
  const phone = useMatchMedia();

  const closeLeftSide = () => {
    phone && eventManager.emit(Event.TOGGLE_LEFT_SIDEBAR);
  };

  return (
    <TagListStyled>
      <Header className={cn({active: isActive})} onClick={toggleIsActive}>
        <h4 className="tag">{tagInfo.tagName}</h4>
        <ArrowSvg/>
      </Header>
      <ul ref={listRef} className={cn('article-list', {active: isActive})}>
        {tagInfo.articles.map(article =>
          <li className="article-title" key={article.link}>
            <Link to={`/article/${article.link}`} onClick={closeLeftSide}>
              {article.title}
            </Link>
          </li>
        )}
      </ul>
    </TagListStyled>
  );
};

export default TagList;