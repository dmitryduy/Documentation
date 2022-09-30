import { IPost, Menu } from '../global.typings';

import { apiFunctionMutation, apiFunctionQuery } from './index';

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

export const postApi = {
  create: apiFunctionMutation<CreatePostRequest, CreatePostResponse>('post', '/create-post'),
  delete: apiFunctionMutation<DeletePostRequest, DeletePostResponse>('delete', '/delete-post'),
  update: apiFunctionMutation<UpdatePostRequest, UpdatePostResponse>('put', '/update-post'),
  find: apiFunctionQuery<FindPostResponse>('/find-post'),
  findOne: apiFunctionQuery<FindOnePostResponse>('/post'),
  nextPostInfo: apiFunctionQuery<NextPostInfoResponse>('/next-post-info')
};