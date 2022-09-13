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
      <li className="marker" data-action="marker">маркер</li>
      <li data-action="image">изображение</li>
      <li className="code" data-action="code">код</li>
      <li className="link" data-action="link">ссылка</li>
      <li data-action="info">инфо</li>
      <li data-action="alert">предупреждение</li>
      <li data-action="tip">подсказка</li>
      <li data-action="unordered-list">список</li>
      <li data-action="ordered-list">нумерованный список</li>
    </ContextMenuStyled>
  );
};

export default ContextMenu;