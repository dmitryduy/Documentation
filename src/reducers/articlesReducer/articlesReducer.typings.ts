export interface PostInfo {
  link: string;
  title: string
}

export interface IArticlesReducerState {
  postInfo: PostInfo | null;
  nextPost: PostInfo | null;
}