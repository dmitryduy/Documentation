import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import TagList from '../TagList/TagList';
import Loader from '../../shared/Loader/Loader';
import { useToggle } from '../../hooks/useToggle';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';
import useMatchMedia from '../../hooks/useMatchMedia';

import { InfoAsideStyled } from './InfoAside.styles';
import { useFetchTagsMenu } from './InfoAside.hook/useFetchTagsMenu';

const InfoAside = React.memo(() => {
  const [activeSide, toggleActiveSide, setActiveSide] = useToggle(false);
  const phone = useMatchMedia();
  const phoneRef = useRef(phone);
  const {isLoading, tags} = useFetchTagsMenu();

  useEffect(() => {
    phoneRef.current = phone;
    !phone && setActiveSide(false);
  }, [phone]);

  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => phoneRef.current &&  toggleActiveSide());

  return (
    <InfoAsideStyled className={cn('scroll', {active: activeSide})}>
      <div className="container">
        {!isLoading ?
          tags?.map(tagInfo => <TagList key={tagInfo.tagName} tagInfo={tagInfo}/>) :
          <Loader/>
        }
      </div>
    </InfoAsideStyled>
  );
});

InfoAside.displayName = 'InfoAside';

export default InfoAside;