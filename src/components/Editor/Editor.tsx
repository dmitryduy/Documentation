import React, { FC } from 'react';

import ContextMenu from '../ContextMenu/ContextMenu';
import { getUpdatedMarkdown } from '../ContextMenu/ContextMenu.utils/getUpdatedMarkdown';
import { Actions } from '../ContextMenu/ContextMenu.typings';
import Tags from '../../shared/Tags/Tags';

import { EditorStyled } from './Editor.styles';
import { useUpdateCaretPosition } from './Editor.hook/useUpdateCaretPosition';

interface IEditorProps {
  children: React.ReactNode;
  markdown: string;
  tags: string[];
  setTags:  React.Dispatch<React.SetStateAction<string[]>>;
  setMarkdown:  React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const Editor: FC<IEditorProps> = ({children, setMarkdown, markdown, tags, setTags}) => {
  const {textareaRef, caretPositionRef} = useUpdateCaretPosition([markdown]);

  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);

  };

  const updateMarkdown = (editType: Actions) => {
    const {selectionStart, selectionEnd} = textareaRef.current || {selectionStart: 0, selectionEnd: 0};
    const {value, posEnd, posStart} = getUpdatedMarkdown(markdown, {editType, selectionStart, selectionEnd});
    setMarkdown(value);
    caretPositionRef.current = [posStart, posEnd];
  };

  return (
    <EditorStyled>
      <ContextMenu updateMarkdown={updateMarkdown}/>
      <Tags tags={tags} setTags={setTags}/>
      <textarea ref={textareaRef} value={markdown} onInput={onInput}/>
      <div className="buttons">
        {children}
      </div>
    </EditorStyled>
  );
};

export default Editor;