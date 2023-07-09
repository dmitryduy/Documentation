export type Menu = (string | string[])[];

export interface IPost {
  markdown: string;
  title: string;
  date: string;
  views: number;
  tags: string[];
  menu: Menu;
  link: string;
  owner: string;
}

export interface ITagList {
  tagName: string;
  articles: {
    link: string;
    title: string;
  }[];
}

export type InfoBlockType = 'alert' | 'info' | 'tip' | 'caution';

export enum QuestionType {
  TEXT = 'text',
  MULTI_SELECT = 'multiselect',
  SINGLE_SELECT = 'single'
}

export interface IQuizQuestion {
  id: number;
  type: QuestionType;
  text: string;
  code: string;
  codeLanguage: string;
  isShuffleOptions: boolean;
  options: {
    value: string,
    isCorrect: boolean;
  }[];
  position: number;
  textCorrectAnswer: string;
}

export type FlowReturn<AsyncFunction extends (...args: any[]) => Promise<any>> =
  Generator<ReturnType<AsyncFunction>,
    void,
    Awaited<ReturnType<AsyncFunction>>>