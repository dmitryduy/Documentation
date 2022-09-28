import fs from 'fs';

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import PostModel from '../models/Post';
import { IPost } from '../types';

export const customValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {error: error.msg};
  }
});

const notFoundPost: IPost[] = JSON.parse(fs.readFileSync(__dirname + '/notFound.json', 'utf8'));

export const createPost = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error, link: null});
    }

    const {markdown, tags, menu, title, owner} = req.body;

    const link =  title.replaceAll(/\s/g, '-').replaceAll(/\//g, '') + Date.now();

    const docPost = new PostModel({link, title, menu, tags, markdown, owner});

    const post = await docPost.save();

    res.status(200).json({error: null, link: post.link});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', link: null});
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    PostModel.findOneAndUpdate(
      {link: req.params.link},
      {$inc: {views: 1}},
      {returnDocument: 'after'},
      (e, doc) => {
        if (e) {
          return res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', post: null});
        }
        res.json({error: null, post: doc || notFoundPost});
      }
    );
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', post: null});
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.json({error: null, posts});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', posts: null});
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error, link: null});
    }

    const {markdown, menu, link, owner} = req.body;
    console.log(req.body);
    const post = await PostModel.findOne({link});
    if (post.owner !== owner) {
      return res.status(400).json({error: 'У вас нет доступа.', link: null});
    }
    await PostModel.updateOne({link},
      {
        markdown,
        menu
      });
    res.status(200).json({error: null});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};

export const getRandomPost = async (req: Request, res: Response) => {
  try {
    const count = await PostModel.count();

    const random = Math.floor(Math.random() * count);
    const post = await PostModel.findOne().skip(random);
    res.status(200).json({error: null, post});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', post: null});
  }
};

export const getRandomPostExcludeVisitedLink = async (req: Request, res: Response) => {
  try {
    const count = await PostModel.count() - 1;

    const random = Math.floor(Math.random() * count);
    const post = await PostModel.findOne({link: {$ne: req.params.visitedLink}}).skip(random);
    res.status(200).json({error: null, title: post.title, link: post.link});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', title: null, link: null});
  }
};
export const findPosts = async (req: Request, res: Response) => {
  const {value} = req.params;
  try {
    const posts = await PostModel.find({title: {$regex: value}}).limit(10);
    const foundedPosts = posts.map(post => ({title: post.title, link: post.link}));

    res.status(200).json({error: null, foundedPosts});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', post: null});
  }
};