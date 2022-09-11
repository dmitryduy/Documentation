import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticlesReducerState, PostInfo } from './articlesReducer.typings';

const initialState = {
  postInfo: null,
  nextPost: null
} as IArticlesReducerState;

const dialogSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPostInfo(state, action: PayloadAction<PostInfo>) {
      state.postInfo = action.payload;
    },
    setNextPost(state, action: PayloadAction<PostInfo | null>) {
      state.nextPost = action.payload;
    }
  }
});

export const { setPostInfo, setNextPost} = dialogSlice.actions;

export const {reducer: articleReducer} = dialogSlice;