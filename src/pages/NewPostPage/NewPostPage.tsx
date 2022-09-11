import React, { FormEvent, useEffect, useRef, useState } from 'react';

import Button from '../../shared/Button/Button';
import { getTitleFromMarkdown } from '../../utils/getTitleFromMarkdown';
import { EmitterNames } from '../../emitterNames';
import { sendPost } from '../../api/sendPost';
import Tags from '../../shared/Tags/Tags';
import { useToggle } from '../../hooks/useToggle';
import Article from '../../components/Article/Article';

import { NewPostPageStyled, Preview, TextareaContainer } from './NewPostPage.styles';
import { isElementScrollToBottom } from './NewPostPage.utils/isElementScrollToBottom';

const NewPostPage = () => {
  const [markdown, setMarkdown] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const isScrollRef = useRef(true);
  const [showTags, toggleShowTags] = useToggle(false);
  const [tags, setTags] = useState<string[]>([]);

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setMarkdown(value);
  };

  const scrollToBottomIsNeeded = () => {
    if (previewRef.current && isScrollRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottomIsNeeded(), [markdown]);

  useEffect(() => {
    const onMessageScroll = () => {
      if (previewRef.current && isElementScrollToBottom(previewRef.current)) {
        isScrollRef.current = true;
        return;
      }
      if (isScrollRef.current) {
        isScrollRef.current = false;
        return;
      }
      isScrollRef.current = false;
    };

    previewRef?.current?.addEventListener('scroll', onMessageScroll);

    return () => previewRef?.current?.removeEventListener('scroll', onMessageScroll);
  }, []);

  const createPost = () => {
    if (!markdown) {
      return;
    }

    const title = getTitleFromMarkdown(markdown);

    if (!title) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Пост должен содержать заголовок'});
      return;
    }

    if (!tags.length) {
      window.emitter.emit(EmitterNames.TOOLTIP_SHOW, {title: 'Статья должна содержать хотя бы 1 тег'});
      return;
    }

    sendPost(markdown, tags, title);
  };

  const addTags = () => {
    toggleShowTags();
  };

  return (
    <>
      <Tags tags={tags} setTags={setTags} visible={showTags}/>
      <NewPostPageStyled>
        <TextareaContainer data-title="Markdown">
          <textarea value={markdown} onInput={onInput}/>
          <div className="buttons">
            <Button onClick={createPost} subtitle="Статья" text="Добавить статью"/>
            <Button onClick={addTags} subtitle="Теги" text={showTags ? 'Закрыть теги' : 'Открыть теги'}/>
          </div>
        </TextareaContainer>
        <Preview data-title="Preview">
          <div ref={previewRef} className="content">
            <Article markdown={markdown}/>
          </div>
        </Preview>
      </NewPostPageStyled>
    </>
  );
};

export default NewPostPage;