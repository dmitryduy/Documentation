import { Dispatch, SetStateAction } from 'react';

import { EmitterNames } from '../../../emitterNames';
import { Errors } from '../../../errors';

export const useTags = (setTags: Dispatch<SetStateAction<string[]>>, tags: string[]) => {
  const addTag = (tag: string) => {
    const cleanValue = tag.trim().toLowerCase();

    if (cleanValue && !tags.includes(cleanValue)) {
      if (tags.length === 15) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.TAGS_LIMIT_ERROR});
        return;
      }
      if (cleanValue.length > 20) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: Errors.TAG_LENGTH_ERROR});
        return;
      }
      setTags([...tags, cleanValue]);
    }
  };

  return addTag;
};
