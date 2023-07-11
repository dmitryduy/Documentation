import { makeAutoObservable } from 'mobx';
import { PostManager } from '@api/postManager/postManager';
import { createPostManager } from '@api/postManager/createPostManager';
import { getTitleFromMarkdown } from '@utils/getTitleFromMarkdown';
import { getMenuFromMarkdown } from '@utils/getMenuFromMarkdown';
import { CreatePostResponse } from '@api/postManager/postManager.typings';
import { showToast } from '@utils/showToast';

import { FlowReturn, IPost } from '@/global.typings';

export interface PostInfo {
  link: string;
  title: string;
}

class PostStore {
  post: IPost | null = null;
  nextPost: PostInfo | null = null;
  isLoading = false;
  private postManager: PostManager;

  constructor() {
    makeAutoObservable(this);
    this.postManager = createPostManager();
  }

  *createPost(
    markdown: string,
    tags: string[],
    login: string,
    onSuccess: (data: CreatePostResponse) => void
  ): FlowReturn<typeof PostManager.prototype.create> {
    try {
      this.isLoading = true;
      const data = yield this.postManager.create({
        markdown,
        tags,
        title: getTitleFromMarkdown(markdown) || '',
        menu: getMenuFromMarkdown(markdown),
        owner: login
      });
      onSuccess(data);
    } catch (e) {
      showToast(e);
    } finally {
      this.isLoading = false;
    }
  }

  * updatePost(markdown: string, link: string, login: string, onSuccess: () => void)
    : FlowReturn<typeof PostManager.prototype.update> {
    try {
      this.isLoading = true;
      yield this.postManager.update({markdown, menu: getMenuFromMarkdown(markdown), link, owner: login});
      onSuccess();
    } catch (e) {
      showToast(e);
    } finally {
      this.isLoading = false;
    }
  }

  *findPost(link: string, signal: AbortSignal): FlowReturn<typeof PostManager.prototype.findOne> {
    try {
      this.isLoading = true;
      const data = yield this.postManager.findOne({link}, signal);
      this.post = data.post;
      this.nextPost = data.nextPostInfo;
    } catch (e) {
      showToast(e);
    } finally {
      this.isLoading = false;
    }
  }

  *deletePost(link: string, login: string, onSuccess: () => void): FlowReturn<typeof PostManager.prototype.delete> {
    try {
      this.isLoading = true;
      yield this.postManager.delete({link, owner: login});
      onSuccess();
    } catch (e) {
      showToast(e);
    } finally {
      this.isLoading = false;
    }
  }
}

export default new PostStore();