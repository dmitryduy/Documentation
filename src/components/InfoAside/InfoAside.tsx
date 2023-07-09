import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import TagList from '../TagList/TagList';
import Loader from '../../shared/Loader/Loader';
import useMatchMedia from '../../hooks/useMatchMedia';
import { eventManager, Event } from '../../utils/emitter';

import { InfoAsideStyled } from './InfoAside.styles';
import { useFetchTagsMenu } from './InfoAside.hook/useFetchTagsMenu';

const InfoAside = React.memo(() => {
  const [isActive, setIsActive] = useState(false);
  const phone = useMatchMedia();
  const phoneRef = useRef(phone);
  const {isLoading, tags} = useFetchTagsMenu();

  useEffect(() => {
    phoneRef.current = phone;
    !phone && setIsActive(false);
  }, [phone]);

  useEffect(() => {
    eventManager.on(Event.TOGGLE_LEFT_SIDEBAR, () => phoneRef.current && setIsActive(prev => !prev));
  }, []);

  return (
    <InfoAsideStyled className={cn('scroll', {active: isActive})}>
      <div className="container">
        {!isLoading ?
          tags?.map(tagInfo => <TagList key={tagInfo.tagName} tagInfo={tagInfo}/>) :
          <Loader/>
        }
      </div>
    </InfoAsideStyled>
  );
});

export default InfoAside;