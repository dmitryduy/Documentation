import { Actions } from '../ContextMenu.typings';
import { contextMenuActions } from '../ContextMenu.constants';

interface Options {
  selectionStart: number;
  selectionEnd: number;
  editType: Actions
}


export const getUpdatedMarkdown = (markdown: string, options: Options) => {
  const {selectionStart, selectionEnd, editType} = options;

  const action = contextMenuActions[editType];

  if (selectionStart === selectionEnd) {
    return {
      value: `${markdown.slice(0, selectionStart)}${action.template}${markdown.slice(selectionStart)}`,
      posStart: selectionStart + action.startSelection,
      posEnd: selectionStart + action.endSelection
    };
  }

  const insertString = action.insert(markdown.slice(selectionStart, selectionEnd));
  return {
    value: `${markdown.slice(0, selectionStart)}${insertString}${markdown.slice(selectionEnd)}`,
    posStart: selectionStart + (insertString.length),
    posEnd: selectionStart + (insertString.length)
  };
};
