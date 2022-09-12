import React, { useCallback, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import { MarkdownContext } from '../../pages/NewPostPage/MarkdownContext';
import CodeText from '../../shared/CodeText/CodeText';
import Link from '../../shared/Link/Link';
import { icons } from '../../icons';

import { ContextMenuStyled, Row } from './ContextMenu.styles';
import { Actions } from './ContextMenu.typings';
import { contextMenuActions } from './ContextMenu.constants';
import { getUpdatedMarkdown } from './ContextMenu.utils/getUpdatedMarkdown';

interface IContextMenuProps {
  contextMenuOptions: {
    isShow: boolean;
    posX: number;
    posY: number;
    startSelection: number;
    endSelection: number;
  };
  hideMenu: () => void;
}

const ContextMenu: React.FC<IContextMenuProps> = ({contextMenuOptions, hideMenu}) => {

  const contextRef = useRef<HTMLDivElement>(null);
  const {markdown, setMarkdown} = useContext(MarkdownContext);
  const contextMenuOptionsRef = useRef({...contextMenuOptions, markdown});

  useEffect(() => {
    contextMenuOptionsRef.current = {...contextMenuOptions, markdown};
  }, [contextMenuOptions, markdown]);


  useEffect(() => {
    const [x, y] = [contextMenuOptions.posX, contextMenuOptions.posY];
    if (contextRef.current) {
      contextRef.current.style.left = x + 'px';
      contextRef.current.style.top = y + 'px';
    }
  }, [contextMenuOptions.posX, contextMenuOptions.posY]);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const {startSelection, endSelection, markdown} = contextMenuOptionsRef.current;

      const initiator = (e.composedPath()[0] as Element);

      if (['LI'].includes(initiator.tagName) && initiator.getAttribute('data-action')) {
        const type = initiator.getAttribute('data-action') as Actions;

        setMarkdown(getUpdatedMarkdown(markdown, {type, startSelection, endSelection}));
        hideMenu();
      }
    };

    contextRef.current?.addEventListener('click', handleClick);

    return () => contextRef.current?.addEventListener('click', handleClick);

  }, []);

  return (
    <ContextMenuStyled ref={contextRef} className={cn({active: contextMenuOptions.isShow})}>
      <Row>
        <li data-action="heading-1">h1</li>
        <li data-action="heading-2">h2</li>
        <li data-action="heading-3">h3</li>
        <li data-action="strong"><strong>b</strong></li>
        <li data-action="italic"><i>i</i></li>
        <li className="marker" data-action="marker">маркер</li>
        <li className="code" data-action="code">код</li>
        <li className="link" data-action="link">{icons.link}</li>
      </Row>
      <Row>
        <li data-action="info">Инфо</li>
        <li data-action="alert">Предупреждение</li>
        <li data-action="tip">Подсказка</li>
        <li data-action="unordered-list">Список</li>
      </Row>
    </ContextMenuStyled>
  );
};

export default ContextMenu;