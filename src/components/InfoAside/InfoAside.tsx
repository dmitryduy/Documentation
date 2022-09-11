import React, { useEffect, useMemo, useState } from 'react';

import { ITagList } from '../../global.typings';
import TagList from '../TagList/TagList';
import { fetchPostsList } from '../../api/fetchPostsList';
import Loader from '../../shared/Loader/Loader';

import { InfoAsideStyled } from './InfoAside.styles';

const InfoAside = React.memo(() => {
  const [tags, setTags] = useState<ITagList[] | null>(null);
  useEffect(() => {
    fetchPostsList().then(setTags);
  }, []);
  const tagsMemo = useMemo(() => tags, [tags]);

  return (
    <InfoAsideStyled>
      {tagsMemo ?
        tagsMemo.map(tagInfo => <TagList key={tagInfo.tagName} tagInfo={tagInfo}/>) :
        <Loader/>
      }
    </InfoAsideStyled>
  );
});

export default InfoAside;