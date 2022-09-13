import React, { useContext, useState, useEffect, useRef } from 'react';

import Button from '../../shared/Button/Button';
import { MarkdownContext } from '../../pages/NewPostPage/MarkdownContext';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import ContextMenu from '../ContextMenu/ContextMenu';
import { getUpdatedMarkdown } from '../ContextMenu/ContextMenu.utils/getUpdatedMarkdown';
import { Actions } from '../ContextMenu/ContextMenu.typings';
import Tags from '../../shared/Tags/Tags';

import { EditorStyled } from './Editor.styles';
import { createPost } from './Editor.utils/createPost';

const Editor = () => {
  const {markdown, setMarkdown} = useContext(MarkdownContext);
  const textareaRef = useFocusOnMount<HTMLTextAreaElement>();
  const caretPosition = useRef<null | [number, number]>(null);
  const [tags, setTags] = useState<string[]>([]);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setMarkdown(value);

  };

  const updateMarkdown = (editType: Actions) => {
    const {selectionStart, selectionEnd} = textareaRef.current || {selectionStart: 0, selectionEnd: 0};
    const {value, posEnd, posStart} = getUpdatedMarkdown(markdown, {editType, selectionStart, selectionEnd});
    setMarkdown(value);
    caretPosition.current = [posStart, posEnd];
  };

  useEffect(() => {
    if (textareaRef.current && caretPosition.current) {
      textareaRef.current.focus();
      const [start, end] = caretPosition.current;

      textareaRef.current.selectionStart = start;
      textareaRef.current.selectionEnd = end;
      caretPosition.current = null;
    }
  }, [markdown]);


  return (
    <EditorStyled>
      <ContextMenu updateMarkdown={updateMarkdown}/>
      <Tags tags={tags} setTags={setTags}/>
      <textarea ref={textareaRef} value={markdown} onInput={onInput}/>
      <div className="buttons">
        <Button onClick={() => createPost(markdown, tags)} subtitle="Статья" text="Добавить статью"/>
      </div>
    </EditorStyled>
  );
};

export default Editor;