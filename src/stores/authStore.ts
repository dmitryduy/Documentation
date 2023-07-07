import { makeAutoObservable } from 'mobx';

import { storage } from '../utils/storage';
import { createUserManager } from '../api/userManager/createUserManager';
import { UserManager } from '../api/userManager/userManager';
import { showTooltip } from '../utils/showTooltip';
import { FlowReturn } from '../global.typings';
import { Errors } from '../errors';

class AuthStore {
  isLoading = false;
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
      this.isLoading = true;
      const data = yield this.userManager.authMe();
      this.login = data.login;
    } catch (e) {
      showTooltip(typeof e === 'string' || e instanceof Error ? e : Errors.UNEXPECTED_ERROR);
    } finally {
      this.isLoading = false;
    }
  }

  *signUp(login: string, password: string, repeatPassword: string): FlowReturn<typeof UserManager.prototype.signUp> {
    try {
      this.isLoading = true;
      const data = yield this.userManager.signUp({login, password, repeatPassword});
      storage('auth-token').setItem(data.token);
      this.login = data.login;
    } catch (e) {
      showTooltip(typeof e === 'string' || e instanceof Error ? e : Errors.UNEXPECTED_ERROR);
    } finally {
      this.isLoading = false;
    }
  }

  *signIn(login: string, password: string): FlowReturn<typeof UserManager.prototype.signIn> {
    try {
      this.isLoading = true;
      const data = yield this.userManager.signIn({login, password});
      storage('auth-token').setItem(data.token);
      this.login = data.login;
    } catch (e) {
      showTooltip(typeof e === 'string' || e instanceof Error ? e : Errors.UNEXPECTED_ERROR);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new AuthStore();