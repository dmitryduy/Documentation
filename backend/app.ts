/* eslint-disable */

import { IPost, ITagList } from './types';
import { Request, Response } from 'express';

const express = require('express');

const app = express();
const http = require('http');

const cors = require('cors');

const fs = require('fs');
const server = http.createServer(app);
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(express.static(__dirname + '/assets'));
const posts: IPost[] = JSON.parse(fs.readFileSync(__dirname + '/db/posts.json', 'utf8'));
const tags: string[] = JSON.parse(fs.readFileSync(__dirname + '/db/tags.json', 'utf8'));

const writePostsToFile = () => {
  fs.writeFileSync(__dirname + '/db/posts.json', JSON.stringify(posts));
  fs.writeFileSync(__dirname + '/db/tags.json', JSON.stringify(tags));
};

app.put('/create-post', (req: Request, res: Response) => {
  const {markdown, tags: articleTags, menu, title} = req.body;

  posts.push({
    markdown,
    tags: articleTags,
    menu,
    title,
    date: Date.now(),
    views: 1,
    link: title.replaceAll(/\s/g, '-').replaceAll(/\//g, '') + Date.now()
  });
  for (const tag of articleTags) {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  writePostsToFile();

  res.status(200);
  res.send();
});

app.get('/posts', (req: Request, res: Response) => {
  res.json(posts);
});

app.get('/random', (req: Request, res: Response) => {
  const notFoundPost = posts.filter(post => post.title !== 'Упс. Данной статьи не существует');
  const postId = Math.floor(Math.random() * notFoundPost.length);

  res.json(notFoundPost.find((_, index) => postId === index));
});

app.get('/post/:link', (req: Request, res: Response) => {
  const notFoundPost = posts.find(post => post.title === 'Упс. Данной статьи не существует');
  res.json(posts.find(post => post.link === req.params.link) || notFoundPost);
});

app.get('/post-tags', (req: Request, res: Response) => {
  const tagList: ITagList[] = [];

  tags.forEach(tag => {
    const taggedPosts = posts.filter(post => post.tags[0] === tag);
    tagList.push(
      {
        tagName: tag,
        articles: taggedPosts.map(taggedPost => ({
          link: taggedPost.link,
          title: taggedPost.title
        }))
      }
    );
  });

  res.json(tagList.filter(tagItem => tagItem.articles.length));
});

app.post('/new-post-info', (req: Request, res: Response) => {
  const activeLink = req.body.activeLink;
  const notViewedPosts = posts.filter(post => post.title !== 'Упс. Данной статьи не существует' && post.link !== activeLink);

  const postId = Math.floor(Math.random() * notViewedPosts.length);
  const post = notViewedPosts.find((_, index) => postId === index)!;

  res.json({title: post.title, link: post.link});

});


server.listen(process.env.PORT || 5000, () => console.log('server start'));