import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { ITagList } from '../../global.typings';
import TagList from '../TagList/TagList';
import { fetchPostsList } from '../../api/fetchPostsList';
import Loader from '../../shared/Loader/Loader';
import { useToggle } from '../../hooks/useToggle';
import { useEmit } from '../../hooks/useEmit';
import { EmitterNames } from '../../emitterNames';
import { Errors } from '../../errors';
import { useResize } from '../../hooks/useResize';

import { InfoAsideStyled } from './InfoAside.styles';

const InfoAside = React.memo(() => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  const [activeSide, toggleActiveSide] = useToggle(false);
  const width = useResize();

  useEmit(EmitterNames.TOGGLE_LEFT_SIDEBAR, () => width < 1001 &&  toggleActiveSide());

  useEffect(() => {
    fetchPostsList().then(data => {
      if (data.error) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.BACKEND_ERROR});
      }
      setTags(data.tags);
    });
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