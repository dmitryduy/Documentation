
export type Menu = (string | string[])[];

export interface IPost {
  markdown: string;
  title: string;
  date: number;
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
