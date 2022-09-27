import { IPost } from '../../global.typings';

export interface PostInfo {
  link: string;
  title: string
}

export interface IArticlesReducerState {
  post: IPost | null;
  nextPost: PostInfo | null;
}