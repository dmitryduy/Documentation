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
  }[]
}

export type InfoBlockType = 'alert' | 'info' | 'tip' | 'caution';

export interface IQuizQuestion {
  id: number;
  type: 'multiselect' | 'single' | 'text';
  question: string;
  code?: string;
  codeLanguage: string | null;
  options: {
    value: string,
    isCorrect: boolean;
  }[];
  position: number;
  textCorrectAnswer?: string;
}
