import { AxiosRequestConfig } from 'axios';

import { ClientAPI } from '../clientAPI/clientAPI';
import { MAX_ARTICLE_LENGTH } from '../../constants';
import { Errors } from '../../errors';
import { checkPost } from '../../utils/checkPost';

import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse, FindOnePostResponse, FindPostResponse,
  UpdatePostRequest, UpdatePostResponse
} from './postManager.typings';

export class PostManager {
  constructor(private readonly clientAPI: ClientAPI) {}

  public async create(data: CreatePostRequest): Promise<CreatePostResponse> {
    if (data.markdown.length > MAX_ARTICLE_LENGTH) {
      throw new Error(Errors.ARTICLE_LENGTH_ERROR);
    }
    const error = checkPost(data.markdown, data.tags);

    if (error) {
      throw new Error(error);
    }

    return await this.clientAPI.mutate('/create-post', data, 'post');
  }

  public async delete(data: DeletePostRequest): Promise<DeletePostResponse> {
    return await this.clientAPI.mutate('/delete-post', data, 'delete');
  }

  public async update(data: UpdatePostRequest): Promise<UpdatePostResponse> {
    return await this.clientAPI.mutate('/update-post', data, 'put');
  }

  public async findPostsByName(query: AxiosRequestConfig['params']): Promise<FindPostResponse> {
    return await this.clientAPI.get('/find-post', query);
  }

  public async findOne(query: AxiosRequestConfig['params']): Promise<FindOnePostResponse> {
    return await this.clientAPI.get('/post', query);
  }
}