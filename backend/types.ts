export interface IPost {
  markdown: string;
  tags: string[];
  menu: (string | string[])[];
  title: string;
  date: number;
  views: number;
  link: string;
}

export interface ITagList {
  tagName: string;
  articles: {
    link: string;
    title: string;
  }[]
}
