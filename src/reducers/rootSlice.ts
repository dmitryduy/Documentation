import { combineReducers } from '@reduxjs/toolkit';

import { articleReducer } from './articlesReducer/articlesReducer';
import { authReducer } from './authReducer/authReducer';

const rootSlice = combineReducers({
  articles: articleReducer,
  auth: authReducer
});

export default rootSlice;