import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPost } from '../../global.typings';

import { IArticlesReducerState, PostInfo } from './articlesReducer.typings';

const initialState = {
  post: null,
  nextPost: null
} as IArticlesReducerState;

const dialogSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPostInfo(state, action: PayloadAction<IPost | null>) {
      state.post = action.payload;
    },
    setNextPost(state, action: PayloadAction<PostInfo | null>) {
      state.nextPost = action.payload;
    }
  }
});

export const { setPostInfo, setNextPost} = dialogSlice.actions;

export const {reducer: articleReducer} = dialogSlice;