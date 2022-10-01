import { createSlice } from '@reduxjs/toolkit';

import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse, FindOnePostResponse, FindPostResponse,
  postApi, UpdatePostRequest, UpdatePostResponse
} from '../../api/postApi';
import { getAsyncActionMutation, getAsyncActionQuery } from '../getAsyncAction';
import { GetAllTagsResponse, tagsApi } from '../../api/tagsApi';

import { IArticlesReducerState } from './articlesReducer.typings';


export const createPost = getAsyncActionMutation<CreatePostRequest, CreatePostResponse>('post/create', postApi.create);

export const deletePost = getAsyncActionMutation<DeletePostRequest, DeletePostResponse>('post/delete', postApi.delete);

export const updatePost = getAsyncActionMutation<UpdatePostRequest, UpdatePostResponse>('post/update', postApi.update);

export const findPosts = getAsyncActionQuery<FindPostResponse>('post/find', postApi.find);

export const findPost = getAsyncActionQuery<FindOnePostResponse>('post/findOne', postApi.findOne);

export const getAllTags = getAsyncActionQuery<GetAllTagsResponse>('post/tags', tagsApi.getAll);

const initialState = {
  post: null,
  nextPost: null,
  loading: false
} as IArticlesReducerState;


const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(findPost.pending, state => {
        state.loading = true;
      })
      .addCase(findPost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.nextPost = action.payload.nextPostInfo;
        state.loading = false;
      }).
      addCase(findPost.rejected, state => {
        state.loading = false;
      });
  }
});

export const {reducer: articleReducer} = articleSlice;