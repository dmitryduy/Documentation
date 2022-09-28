import React, { Dispatch, FC, SetStateAction } from 'react';

import { EmitterNames } from '../../emitterNames';
import { useEmit } from '../../hooks/useEmit';
import { useToggle } from '../../hooks/useToggle';
import { useHeightAnimate } from '../../hooks/useHeightAnimate';
import { useInput } from '../../hooks/useInput';

import { NewTags, TagsStyled } from './Tags.styles';
import { useTags } from './Tags.hook/useTags';

interface ITagsProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const Tags: FC<ITagsProps> = ({setTags, tags}) => {
  const [value, setValue] = useInput('', 20);
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

  const onClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
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
          <input
            type="text"
            value={value}
            onInput={onInput}
            onDoubleClick={onClickButton}
            placeholder="+ Добавить"
            onKeyDown={onKeyDown}
          />
        </NewTags>
      </div>
    </TagsStyled>
  );
};

export default Tags;