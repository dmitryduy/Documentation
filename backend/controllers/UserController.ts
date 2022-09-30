import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import { customValidationResult } from './PostController';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error});
    }

    const {login, password} = req.body;

    const foundedUser = await User.findOne({login});
    if (foundedUser) {
      return res.status(400).json({error: 'Данный логин уже существует.'});
    }

    const docPost = new User({login, password});

    const user = await docPost.save();

    const token = jwt.sign({
      login: user.login
    },
    process.env.SALT,
    {
      expiresIn: '15d'
    });

    res.status(200).json({login: user.login, token});
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = customValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()[0].error});
    }

    const {login, password} = req.body;
    const foundedUser = await User.findOne({login, password });
    if (!foundedUser) {
      return res.status(400).json({error: 'Неверный логин или пароль'});
    }

    const token = jwt.sign({
      login: foundedUser.login
    },
    process.env.SALT,
    {
      expiresIn: '15d'
    });

    res.status(200).json({login: foundedUser.login, token});

  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};



export const authMe = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
      const decoded = jwt.verify(token, process.env.SALT);
      const owner = decoded.login;
      const user = await User.findOne({login: owner});
      if (!user) {
        return res.status(200).json({login: null});
      }

      res.status(200).json({login: user.login});

    } else {
      return res.status(200).json({login: null});
    }
  } catch (e) {
    res.status(500).json({error: 'Ошибка бекенда. Попробуйте позже'});
  }
};
