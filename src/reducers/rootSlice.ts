import { combineReducers } from '@reduxjs/toolkit';

import { postReducer } from './postReducer/postReducer';
import { authReducer } from './authReducer/authReducer';
import { settingsReducer } from './settingsReducer/settingsReducer';

const rootSlice = combineReducers({
  posts: postReducer,
  auth: authReducer,
  settings: settingsReducer
});

export default rootSlice;