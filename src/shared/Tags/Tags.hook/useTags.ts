import { Dispatch, SetStateAction } from 'react';

import { Errors } from '../../../errors';
import { showToast } from '../../../utils/showToast';

export const useTags = (setTags: Dispatch<SetStateAction<string[]>>, tags: string[]) => {

  return (tag: string) => {
    const cleanValue = tag.trim().toLowerCase();

    if (cleanValue && !tags.includes(cleanValue)) {
      if (tags.length === 15) {
        showToast(Errors.TAGS_LIMIT_ERROR);
        return;
      }
      if (cleanValue.length > 20) {
        showToast(Errors.TAG_LENGTH_ERROR);
        return;
      }
      setTags([...tags, cleanValue]);
    }
  };
};
