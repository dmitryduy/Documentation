import React, { Dispatch, FC, SetStateAction, useRef } from 'react';

import { EmitterNames } from '../../emitterNames';
import { useEmit } from '../../hooks/useEmit';
import { useToggle } from '../../hooks/useToggle';
import { useHeightAnimate } from '../../hooks/useHeightAnimate';
import { useInput } from '../../hooks/useInput';

import { NewTags, TagsStyled, Input } from './Tags.styles';
import { useTags } from './Tags.hook/useTags';

interface ITagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags: FC<ITagsProps> = ({setTags, tags}) => {
  const [value, setValue] = useInput('', 20);
  const [isActive, toggleIsActive] = useToggle(false);
  const tagsRef = useHeightAnimate<HTMLDivElement>(isActive, {extraHeight: 10, deps: [tags, value], maxHeight: 200});
  const addTag = useTags(setTags, tags);
  const inputRef = useRef<HTMLInputElement>(null);

  useEmit(EmitterNames.TOGGLE_POST_TAGS, () => toggleIsActive());

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      addTag(value);
      setValue('');
    }
  };

  const onClickButton = () => {
    inputRef.current?.focus();
    addTag(value);
    setValue('');
  };

  const removeTag = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TagsStyled ref={tagsRef}>
      <div className="container">
        <NewTags>
          {tags.map(tag => <li className="tag" onClick={removeTag.bind(null, tag)} key={tag}>
            {tag}
            <span>&times;</span>
          </li>)}
          <Input>
            {value && <span onClick={onClickButton} className="tooltip"><span className="add">+</span> {value}</span>}
            <input
              ref={inputRef}
              type="text"
              value={value}
              onInput={onInput}
              placeholder="+ Добавить"
              onKeyDown={onKeyDown}
            />
          </Input>
        </NewTags>
      </div>
    </TagsStyled>
  );
};

export default Tags;