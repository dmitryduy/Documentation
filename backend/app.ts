import http from 'http';

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { creationValidation } from './validations/creation';
import {
  createPost, deletePost, findPosts,
  getAllPosts,
  getPost,
  updatePost
} from './controllers/PostController';
import { getArticles } from './controllers/TagController';
import { authMe, loginUser, register } from './controllers/UserController';
import { registerValidation } from './validations/register';
import { loginValidation } from './validations/login';
import { deleteValidation } from './validations/delete';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(express.static(__dirname + '/assets'));

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('db success'))
  .catch(console.log);

app.post('/create-post', creationValidation, createPost);

app.put('/update-post', updatePost);

app.get('/posts', getAllPosts);

app.get('/post/', getPost);

app.get('/post-tags', getArticles);

app.post('/register', registerValidation, register);

app.post('/login', loginValidation, loginUser);

app.get('/find-post', findPosts);

app.delete('/delete-post', deleteValidation, deletePost);

app.get('/auth/me', authMe);

server.listen(process.env.PORT || 5000, () => console.log('server start'));