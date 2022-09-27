import { useEffect, useMemo, useState } from 'react';

import { fetchPostsList } from '../../../api/fetchPostsList';
import { showTooltip } from '../../../utils/showTooltip';
import { Errors } from '../../../errors';
import { ITagList } from '../../../global.typings';

export const useFetchTagsMenu = () => {
  const [tags, setTags] = useState<ITagList[] | null>(null);

  const tagsMemo = useMemo(() => tags, [tags]);

  useEffect(() => {
    fetchPostsList().then(data => {
      if (data.error) {
        showTooltip(Errors.BACKEND_ERROR);
        return;
      }
      setTags(data.tags);
    }).catch(() => showTooltip(Errors.UNEXPECTED_ERROR));
  }, []);

  return tagsMemo;
};
