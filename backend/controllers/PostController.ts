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
      return res.status(400).json({error: errors.array()[0].error});
    }

    const {markdown, tags, menu, title, owner} = req.body;

    const link =  title.replaceAll(/[^a-zA-Z0-9 А-Яа-я]/g, '').replaceAll(' ', '-') + Date.now();

    const docPost = new PostModel({link, title, menu, tags, markdown, owner});

    const post = await docPost.save();

    res.status(200).json({link: post.link});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.json({posts});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error});
    }

    const {markdown, menu, link, owner} = req.body;
    const post = await PostModel.findOne({link});
    if (post.owner !== owner) {
      return res.status(400).json({error: 'У вас нет доступа.'});
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

    const random2 = Math.floor(Math.random() * (count - 1));
    const nextPost = await PostModel.findOne({link: {$ne: post.link}}).skip(random2);
    res.status(200).json({post, nextPostInfo: {title: nextPost.title, link: nextPost.link}});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    if (!req.query.link) {
      return getRandomPost(req, res);
    }

    const count = await PostModel.count() - 1;
    const random = Math.floor(Math.random() * count);
    const post = await PostModel.findOne({link: {$ne: req.query.link}}).skip(random);
    PostModel.findOneAndUpdate(
      {link: req.query.link},
      {$inc: {views: 1}},
      {returnDocument: 'after'},
      (e, doc) => {
        if (e) {
          return res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
        }
        res.json({post: doc || notFoundPost, nextPostInfo: {title: post.title, link: post.link}});
      }
    );
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};
export const findPosts = async (req: Request, res: Response) => {
  try {
    const {value} = req.query;
    const regexp = new RegExp(value.toString(), 'i');
    const posts = await PostModel.find({title: {$regex: regexp}}).limit(10);
    const foundedPosts = posts.map(post => ({title: post.title, link: post.link, owner: post.owner}));

    res.status(200).json({foundedPosts});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error});
    }

    const {link, owner} = req.body;
    const post = await PostModel.findOne({link});
    if (post.owner !== owner) {
      return res.status(400).json({error: 'У вас нет доступа.'});
    }
    await PostModel.deleteOne({link});
    res.status(200).json({error: null});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};