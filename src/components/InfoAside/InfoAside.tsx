import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { ITagList } from '../../global.typings';
import TagList from '../TagList/TagList';
import { fetchPostsList } from '../../api/fetchPostsList';
import Loader from '../../shared/Loader/Loader';
import { useToggle } from '../../hooks/useToggle';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';

import { InfoAsideStyled } from './InfoAside.styles';

const InfoAside = React.memo(() => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  const [activeSide, toggleActiveSide] = useToggle(false);

  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => toggleActiveSide());

  useEffect(() => {
    fetchPostsList().then(setTags);
  }, []);
  const tagsMemo = useMemo(() => tags, [tags]);

  return (
    <InfoAsideStyled className={cn({active: activeSide})}>
      {tagsMemo ?
        tagsMemo.map(tagInfo => <TagList key={tagInfo.tagName} tagInfo={tagInfo}/>) :
        <Loader/>
      }
    </InfoAsideStyled>
  );
});

export default InfoAside;