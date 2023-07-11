import { makeAutoObservable } from 'mobx';
import { storage } from '@utils/storage';

class SettingsStore {
  theme = storage('theme').getItem() || 'dark';

  constructor() {
    makeAutoObservable(this);
  }

  changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    storage('theme').setItem(this.theme);
  }
}

export default new SettingsStore();