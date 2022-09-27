import React, { MouseEvent, useRef } from 'react';


import { EmitterNames } from '../../emitterNames';

import { ContextMenuStyled } from './ContextMenu.styles';
import { Actions } from './ContextMenu.typings';


interface IContextMenuProps {
  updateMarkdown: (editType: Actions) => void;
}

const ContextMenu: React.FC<IContextMenuProps> = ({updateMarkdown}) => {

  const menuRef = useRef<HTMLDivElement>(null);

  const editText = (e: MouseEvent<HTMLDivElement>) => {
    const initiator = e.target as HTMLElement;
    const editType = initiator.getAttribute('data-action') as Actions;

    editType && updateMarkdown(editType);
  };

  return (
    <ContextMenuStyled ref={menuRef} onClick={editText}>
      <li onClick={() => window.emitter.emit(EmitterNames.TOGGLE_POST_TAGS)}>теги</li>
      <li data-action="heading-1">h1</li>
      <li data-action="heading-2">h2</li>
      <li data-action="heading-3">h3</li>
      <li data-action="strong" className="strong">b</li>
      <li data-action="italic" className="italic">i</li>
      <li data-action="delete" className="delete">u</li>
      <li data-action="paragraph">Параграф</li>
      <li className="marker" data-action="marker">Маркер</li>
      <li data-action="image">Изображение</li>
      <li data-action="video">Видео</li>
      <li className="code" data-action="code">Код</li>
      <li className="link" data-action="link">Ссылка</li>
      <li data-action="table">Таблица</li>
      <li data-action="info">Инфо</li>
      <li data-action="alert">Тревога</li>
      <li data-action="tip">Подсказка</li>
      <li data-action="caution">Предупреждение</li>
      <li data-action="unordered-list">Список</li>
      <li data-action="ordered-list">Нумерованный список</li>
    </ContextMenuStyled>
  );
};

export default ContextMenu;