import { combineReducers } from '@reduxjs/toolkit';

import { articleReducer } from './articlesReducer/articlesReducer';
import { authReducer } from './authReducer/authReducer';
import { settingsReducer } from './settingsReducer/settingsReducer';

const rootSlice = combineReducers({
  articles: articleReducer,
  auth: authReducer,
  settings: settingsReducer
});

export default rootSlice;