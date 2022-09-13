import { createContext } from 'react';

interface IMarkdownContext {
  markdown: string;
  setMarkdown: (value: string) => void;
  onButtonClick?: (markdown: string) => void;
  buttonValue: string;
}

export const MarkdownContext = createContext<IMarkdownContext>({
  markdown: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMarkdown: () => {},
  buttonValue: ''
});