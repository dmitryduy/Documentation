import React, { MouseEvent, useRef, useState } from 'react';

import QuizCreatorPopup from '../QuizCreatorPopup/QuizCreatorPopup';
import { eventManager, Event } from '../../utils/emitter';

import { ContextMenuStyled } from './ContextMenu.styles';
import { Actions } from './ContextMenu.typings';


interface IContextMenuProps {
  updateMarkdown: (editType: Actions) => void;
}

const ContextMenu: React.FC<IContextMenuProps> = ({updateMarkdown}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isQuizConstructor, setIsQuizConstructor] = useState(false);

  const editText = (e: MouseEvent<HTMLDivElement>) => {
    const initiator = e.target as HTMLElement;
    const editType = initiator.getAttribute('data-action') as Actions;

    editType && updateMarkdown(editType);
  };

  return (
    <ContextMenuStyled className="scroll" ref={menuRef} onClick={editText}>
      <li onClick={() => eventManager.emit(Event.TOGGLE_POST_TAGS)}>теги</li>
      <li data-action="quiz" onClick={() => setIsQuizConstructor(true)}>квиз</li>
      <li data-action="heading-1">h1</li>
      <li data-action="heading-2">h2</li>
      <li data-action="heading-3">h3</li>
      <li data-action="strong" className="strong">b</li>
      <li data-action="italic" className="italic">i</li>
      <li data-action="delete" className="delete">u</li>
      <li className="marker" data-action="marker">маркер</li>
      <li data-action="image">изображение</li>
      <li data-action="video">видео</li>
      <li className="code" data-action="code">код</li>
      <li className="link" data-action="link">ссылка</li>
      <li data-action="table">таблица</li>
      <li data-action="info">инфо</li>
      <li data-action="alert">тревога</li>
      <li data-action="tip">подсказка</li>
      <li data-action="caution">предупреждение</li>
      <li data-action="unordered-list">список</li>
      <li data-action="ordered-list">нумерованный список</li>
      <QuizCreatorPopup active={isQuizConstructor} close={() => setIsQuizConstructor(false)}/>
    </ContextMenuStyled>
  );
};

export default ContextMenu;