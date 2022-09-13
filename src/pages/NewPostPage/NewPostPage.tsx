import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import Article from '../../components/Article/Article';
import useMatchMedia from '../../hooks/useMatchMedia';
import Editor from '../../components/Editor/Editor';

import { NewPostPageStyled, Preview, PreviewButton } from './NewPostPage.styles';
import { isElementScrollToBottom } from './NewPostPage.utils/isElementScrollToBottom';
import { MarkdownContext } from './MarkdownContext';

interface INewPostPageProps {
  markdownTemplate?: string;
  updateArticle?: (markdown: string) => void;
  buttonValue?: string;
}

const NewPostPage: FC<INewPostPageProps> = ({markdownTemplate, updateArticle, buttonValue}) => {
  const [markdown, setMarkdown] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const isScrollRef = useRef(!markdownTemplate);
  const phone = useMatchMedia();
  const [widePreview, setWidePreview] = useState(false);

  const updateMarkdown = (value: string) => {
    setMarkdown(value);
  };

  useEffect(() => {
    markdownTemplate && updateMarkdown(markdownTemplate);
  }, [markdownTemplate]);

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

  return (
    <MarkdownContext.Provider value={{
      markdown,
      setMarkdown: updateMarkdown,
      onButtonClick: updateArticle,
      buttonValue: buttonValue || 'Добавить статью'
    }}>
      <NewPostPageStyled>
        <Editor/>
        <Preview className={cn({active: widePreview})} onClick={() => !widePreview && setWidePreview(true)}>
          {phone && <PreviewButton onClick={() => setWidePreview(false)}>&times;</PreviewButton>}
          <div ref={previewRef} className="content">
            <Article markdown={markdown}/>
          </div>
        </Preview>
      </NewPostPageStyled>
    </MarkdownContext.Provider>
  );
};

export default NewPostPage;