import { makeAutoObservable } from 'mobx';
import compilerStore from '@stores/compilerStore';

import authStore from './authStore';
import postStore from './postStore';
import settingsStore from './settingsStore';
import quizConstructorStore from './quizConstructorStore';

export class RootStore {
  authStore = authStore;
  postStore = postStore;
  settingsStore = settingsStore;
  quizStore = quizConstructorStore;
  compilerStore = compilerStore;

  constructor() {
    makeAutoObservable(this);
  }
}