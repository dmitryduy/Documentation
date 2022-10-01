import { apiFunctionMutation, apiFunctionQuery } from '../index';

import {
  CreatePostRequest,
  CreatePostResponse,
  FindPostResponse,
  FindOnePostResponse,
  UpdatePostResponse,
  UpdatePostRequest,
  DeletePostResponse,
  DeletePostRequest,
  NextPostInfoResponse
} from './postApi.typings';

export const postApi = {
  create: apiFunctionMutation<CreatePostRequest, CreatePostResponse>('post', '/create-post'),
  delete: apiFunctionMutation<DeletePostRequest, DeletePostResponse>('delete', '/delete-post'),
  update: apiFunctionMutation<UpdatePostRequest, UpdatePostResponse>('put', '/update-post'),
  find: apiFunctionQuery<FindPostResponse>('/find-post'),
  findOne: apiFunctionQuery<FindOnePostResponse>('/post'),
  nextPostInfo: apiFunctionQuery<NextPostInfoResponse>('/next-post-info')
};