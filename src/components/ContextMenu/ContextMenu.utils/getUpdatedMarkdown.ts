import { Actions } from '../ContextMenu.typings';
import { contextMenuActions } from '../ContextMenu.constants';

interface Options {
  startSelection: number;
  endSelection: number;
  type: Actions
}


export const getUpdatedMarkdown = (markdown: string, options: Options) => {
  const {startSelection, endSelection, type} = options;
  console.log(startSelection, endSelection, type);
  if (startSelection === endSelection) {
    return `${markdown.slice(0, startSelection)}${contextMenuActions[type].template}${markdown.slice(startSelection)}`;
  }

  const insertString = contextMenuActions[type].insert(markdown.slice(startSelection, endSelection));
  return `${markdown.slice(0, startSelection)}${insertString}${markdown.slice(endSelection)}`;
};
