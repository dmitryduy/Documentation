import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import Input from '../Input/Input';
import { EmitterNames } from '../../emitterNames';

import { NewTags, TagsStyled } from './Tags.styles';

interface ITagsProps {
  visible: boolean;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags: FC<ITagsProps> = ({visible, setTags, tags}) => {
  const [value, setValue] = useState('');

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cleanValue = value.trim().toLowerCase();
    if (e.code === 'Enter' && cleanValue && !tags.includes(cleanValue)) {
      if (tags.length === 15) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Превышен лимит тегов'});
        return;
      }
      if (cleanValue.length > 20) {
        window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Длина тега не должна превышать 20 символов'});
        return;
      }
      setTags([...tags, cleanValue]);
    }
    if (e.code === 'Enter') {
      setValue('');
    }
  };

  const removeTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  return (
    <TagsStyled className={cn({visible})}>
      <Input
        value={value}
        setValue={((value: string) => setValue(value))}
        onKeyDown={addTag}
        placeholder="Введите тег. Например: React"/>
      <NewTags>
        {tags.map(tag => <li className="tag" onClick={removeTag.bind(null, tag)} key={tag}>{tag}</li>)}
      </NewTags>
    </TagsStyled>
  );
};

export default Tags;