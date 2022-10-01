type LocalStorageKeys = 'auth-token' | 'theme';

export const storage = (key: LocalStorageKeys) => {
  return {
    getItem() {
      return window.localStorage.getItem(key);
    },
    setItem(value: string) {
      window.localStorage.setItem(key, value);
    }
  };
};
