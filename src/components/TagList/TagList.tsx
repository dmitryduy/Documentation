import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { ITagList } from '../../global.typings';
import { useToggle } from '../../hooks/useToggle';
import { EmitterNames } from '../../emitterNames';
import { useHeightAnimate } from '../../hooks/useHeightAnimate';
import useMatchMedia from '../../hooks/useMatchMedia';
import {ReactComponent as ArrowSvg} from '../../assets/images/arrow.svg';

import { Header, TagListStyled } from './TagList.styles';

interface ITagListProps {
  tagInfo: ITagList;
}

const TagList: React.FC<ITagListProps> = ({tagInfo}) => {
  const [isActive, toggleIsActive] = useToggle(true);
  const listRef = useHeightAnimate<HTMLUListElement>(isActive);
  const phone = useMatchMedia();

  const closeLeftSide = () => {
    phone && window.emitter.emit(EmitterNames.TOGGLE_LEFT_SIDEBAR);
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