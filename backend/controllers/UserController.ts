import { Request, Response } from 'express';

import User from '../models/User';

import { customValidationResult } from './PostController';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error, login: null});
    }

    const {login, password} = req.body;

    const foundedUser = await User.findOne({login});
    if (foundedUser) {
      return res.status(400).json({error: 'Данный логин уже существует.', login: null});
    }

    const docPost = new User({login, password});

    const user = await docPost.save();

    res.status(200).json({error: null, login: user.login});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', login: null});
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error, login: null});
    }

    const {login, password} = req.body;

    const foundedUser = await User.findOne({password, login});
    if (foundedUser) {
      return res.status(200).json({error: null, login: foundedUser.login});
    }
    res.status(400).json({error: 'Неверный логин или пароль', login: null});


  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже', login: null});
  }
};
