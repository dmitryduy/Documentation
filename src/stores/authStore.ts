import { makeAutoObservable } from 'mobx';

import { storage } from '../utils/storage';
import { createUserManager } from '../api/userManager/createUserManager';
import { UserManager } from '../api/userManager/userManager';
import { FlowReturn } from '../global.typings';
import { showToast } from '../utils/showToast';

class AuthStore {
  isSignInLoading = false;
  isSignUpLoading = false;
  login: string | null = null;
  private userManager: UserManager;

  constructor() {
    makeAutoObservable(this);
    this.userManager = createUserManager();
  }

  logout() {
    this.login = null;
    storage('auth-token').removeItem();
  }

  *authMe(): FlowReturn<typeof UserManager.prototype.authMe> {
    try {
      const data = yield this.userManager.authMe();
      this.login = data.login;
    } catch (e) {
      showToast(e);
    }
  }

  *signUp(
    login: string,
    password: string,
    repeatPassword: string,
    onSuccess: () => void,
  ): FlowReturn<typeof UserManager.prototype.signUp> {
    try {
      this.isSignUpLoading = true;
      const data = yield this.userManager.signUp({login, password, repeatPassword});
      storage('auth-token').setItem(data.token);
      this.login = data.login;
      onSuccess();
    } catch (e) {
      showToast(e);
    } finally {
      this.isSignUpLoading = false;
    }
  }

  *signIn(login: string, password: string, onSuccess: () => void,): FlowReturn<typeof UserManager.prototype.signIn> {
    try {
      this.isSignInLoading = true;
      const data = yield this.userManager.signIn({login, password});
      storage('auth-token').setItem(data.token);
      this.login = data.login;
      onSuccess();
    } catch (e) {
      showToast(e);
    } finally {
      this.isSignInLoading = false;
    }
  }
}

export default new AuthStore();