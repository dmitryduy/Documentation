import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { ITagList } from '../../global.typings';
import TagList from '../TagList/TagList';
import { fetchPostsList } from '../../api/fetchPostsList';
import Loader from '../../shared/Loader/Loader';
import { useToggle } from '../../hooks/useToggle';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';
import { Errors } from '../../errors';
import { showTooltip } from '../../utils/showTooltip';
import useMatchMedia from '../../hooks/useMatchMedia';

import { InfoAsideStyled } from './InfoAside.styles';
import { useFetchTagsMenu } from './InfoAside.hook/useFetchTagsMenu';

const InfoAside = React.memo(() => {
  const [activeSide, toggleActiveSide, setActiveSide] = useToggle(false);
  const phone = useMatchMedia();
  const tags = useFetchTagsMenu();

  useEffect(() => {
    !phone && setActiveSide(false);
  }, [phone]);

  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => phone &&  toggleActiveSide());


  return (
    <InfoAsideStyled className={cn({active: activeSide})}>
      <div className="container">
        {tags ?
          tags.map(tagInfo => <TagList key={tagInfo.tagName} tagInfo={tagInfo}/>) :
          <Loader/>
        }
      </div>
    </InfoAsideStyled>
  );
});

export default InfoAside;