import { Request, Response } from 'express';

import { ITagList } from '../types';
import PostModel from '../models/Post';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const tagList: ITagList[] = [];
    const count = await PostModel.count();
    const lastPosts = await PostModel.find().skip(Math.max(0, count - 50));

    const mappedPosts = lastPosts.map(post => ({tag: post.tags[0], title: post.title, link: post.link}));

    const tagObject = {} as  {[key in string]: {title: string, link: string}[]};

    mappedPosts.forEach(post => {
      // eslint-disable-next-line no-prototype-builtins
      if (tagObject.hasOwnProperty(post.tag)) {
        tagObject[post.tag].push({link: post.link, title: post.title});
      } else {
        tagObject[post.tag] = [{link: post.link, title: post.title}];
      }
    });
    for (const tag in tagObject) {
      tagList.push({articles: tagObject[tag], tagName: tag});
    }
    res.json({error: null, tags: tagList});


  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', tags: null});
  }
};