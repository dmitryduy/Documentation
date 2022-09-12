import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import cn from 'classnames';

import Input from '../Input/Input';
import { EmitterNames } from '../../emitterNames';
import { useEmit } from '../../hooks/useEmit';
import { useToggle } from '../../hooks/useToggle';
import Button from '../Button/Button';

import { NewTags, TagsStyled, InputWrapper } from './Tags.styles';

interface ITagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags: FC<ITagsProps> = ({setTags, tags}) => {
  const [value, setValue] = useState('');
  const [isActive, toggleIsActive] = useToggle(false);

  useEmit(EmitterNames.TOGGLE_POST_TAGS, () => toggleIsActive());

  const addTag = () => {
    const cleanValue = value.trim().toLowerCase();
    if (cleanValue && !tags.includes(cleanValue)) {
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

  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addTag();
      setValue('');
    }
  };

  const removeTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  return (
    <TagsStyled className={cn({visible: isActive})}>
      <InputWrapper>
        <Input
          value={value}
          setValue={((value: string) => setValue(value))}
          onKeyDown={onKeyDown}
          placeholder="Введите тег. Например: React"/>
        <Button text="Добавить" subtitle="Добавить" onClick={addTag}/>
      </InputWrapper>
      <NewTags>
        {tags.map(tag => <li className="tag" onClick={removeTag.bind(null, tag)} key={tag}>{tag}</li>)}
      </NewTags>
    </TagsStyled>
  );
};

export default Tags;