import { combineReducers } from '@reduxjs/toolkit';

import { articleReducer } from './articlesReducer/articlesReducer';

const rootSlice = combineReducers({
  articles: articleReducer
});

export default rootSlice;