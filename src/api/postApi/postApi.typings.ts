import { IPost, Menu } from '../../global.typings';

export interface CreatePostRequest {
  markdown: string;
  tags: string[];
  title: string;
  owner: string;
  menu: Menu;
}

export interface CreatePostResponse {
  link: string;
}

export interface DeletePostRequest {
  owner: string;
  link: string;
}

export interface DeletePostResponse {
  error: string | null;
}

export interface UpdatePostRequest {
  markdown: string;
  menu: (string | string[])[];
  link: string;
  owner: string;
}

export type UpdatePostResponse = DeletePostResponse;

export interface FindPostResponse {
  foundedPosts: {
    link: string;
    title: string;
    owner: string;
  }[]
}

export interface FindOnePostResponse {
  post: IPost;
  nextPostInfo: {
    title: string;
    link: string;
  }
}

export interface NextPostInfoResponse {
  title: string;
  link: string;
}