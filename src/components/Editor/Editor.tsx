import React, { useContext, useState, MouseEvent, useEffect } from 'react';

import Button from '../../shared/Button/Button';
import { MarkdownContext } from '../../pages/NewPostPage/MarkdownContext';
import { EmitterNames } from '../../emitterNames';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import ContextMenu from '../ContextMenu/ContextMenu';

import { EditorStyled } from './Editor.styles';
import { createPost } from './Editor.utils/createPost';


const Editor = () => {
  const {markdown, setMarkdown, tags} = useContext(MarkdownContext);
  const textareaRef = useFocusOnMount<HTMLTextAreaElement>();
  const [contextMenu, setContextMenu] = useState({
    isShow: false,
    posX: 0,
    posY: 0,
    startSelection: 0,
    endSelection: 0
  });

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setMarkdown(value);

  };

  const toggleTags = () => window.emitter.emit(EmitterNames.TOGGLE_POST_TAGS);

  const openContextMenu = (e: MouseEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    console.log(target.selectionEnd, target.selectionStart);
    setContextMenu({
      startSelection: target.selectionStart,
      endSelection: target.selectionEnd,
      isShow: true,
      posY: e.clientY + 15,
      posX: e.clientX
    });
  };

  useEffect(() => {
    const removeContextMenu = () => {
      setContextMenu({...contextMenu, isShow: false});
    };

    document.addEventListener('click', removeContextMenu);

    return () => document.removeEventListener('click', removeContextMenu);
  }, []);

  const hideMenu = () => {
    setContextMenu({...contextMenu, isShow: false});
  };

  return (
    <EditorStyled>
      <ContextMenu contextMenuOptions={contextMenu} hideMenu={hideMenu}/>
      <textarea ref={textareaRef} value={markdown} onInput={onInput} onContextMenu={openContextMenu}/>
      <div className="buttons">
        <Button onClick={() => createPost(markdown, tags)} subtitle="Статья" text="Добавить статью"/>
        <Button onClick={toggleTags} subtitle="Теги" text="Открыть/Закрыть теги"/>
      </div>
    </EditorStyled>
  );
};

export default Editor;