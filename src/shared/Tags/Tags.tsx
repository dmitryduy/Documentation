import React, { Dispatch, FC, SetStateAction, useState } from 'react';

import Input from '../Input/Input';
import { EmitterNames } from '../../emitterNames';
import { useEmit } from '../../hooks/useEmit';
import { useToggle } from '../../hooks/useToggle';
import Button from '../Button/Button';
import { useHeightAnimate } from '../../hooks/useHeightAnimate';

import { NewTags, TagsStyled } from './Tags.styles';
import { useTags } from './Tags.hook/useTags';

interface ITagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags: FC<ITagsProps> = ({setTags, tags}) => {
  const [value, setValue] = useState('');
  const [isActive, toggleIsActive] = useToggle(false);
  const tagsRef = useHeightAnimate<HTMLDivElement>(isActive, 10, [tags]);
  const addTag = useTags(setTags, tags);

  useEmit(EmitterNames.TOGGLE_POST_TAGS, () => toggleIsActive());

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addTag(value);
      setValue('');
    }
  };

  const onClickButton = () => {
    addTag(value);
    setValue('');
  };

  const removeTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  return (
    <TagsStyled ref={tagsRef}>
      <div className="container">
        <NewTags>
          {tags.map(tag => <li className="tag" onClick={removeTag.bind(null, tag)} key={tag}>
            {tag}
            <span>&times;</span>
          </li>)}
        </NewTags>
        <Input
          value={value}
          setValue={((value: string) => setValue(value))}
          onKeyDown={onKeyDown}
          placeholder="Введите теги..."/>
        <Button text="Добавить" onClick={onClickButton}/>
      </div>
    </TagsStyled>
  );
};

export default Tags;