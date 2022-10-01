import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import TagList from '../TagList/TagList';
import Loader from '../../shared/Loader/Loader';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';
import useMatchMedia from '../../hooks/useMatchMedia';

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

  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => phoneRef.current && setIsActive(prev => !prev));

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