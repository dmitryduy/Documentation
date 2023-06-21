import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPost } from '../../global.typings';

import { IPostReducerState, PostInfo } from './postReducer.typings';

const initialState = {
  post: null,
  nextPost: null,
  loading: false
} as IPostReducerState;

const postSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<{post: IPost, nextPostInfo: PostInfo}>) {
      state.post = action.payload.post;
      state.nextPost = action.payload.nextPostInfo;
      state.loading = false;
    },
    startFetchPost(state) {
      state.loading = true;
    },
    endFetchPost(state) {
      state.loading = false;
    }
  }
});

export const {setPost, startFetchPost, endFetchPost} = postSlice.actions;
export const {reducer: postReducer} = postSlice;