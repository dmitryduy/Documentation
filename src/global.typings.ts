
type MenuElement = string | MenuElement[];

export type Menu = MenuElement[];

export interface IPost {
  markdown: string;
  title: string;
  date: number;
  views: number;
  tags: string[];
  menu: Menu;
  link: string;
}

export interface ITagList {
  tagName: string;
  articles: {
    link: string;
    title: string;
  }[]
}

export type InfoBlockType = 'alert' | 'info' | 'tip';
