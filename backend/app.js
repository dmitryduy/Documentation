"use strict";
/* eslint-disable */
exports.__esModule = true;
var express = require('express');
var app = express();
var http = require('http');
var cors = require('cors');
var fs = require('fs');
var server = http.createServer(app);
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(express.static(__dirname + '/assets'));
var posts = JSON.parse(fs.readFileSync(__dirname + '/db/posts.json', 'utf8'));
var tags = JSON.parse(fs.readFileSync(__dirname + '/db/tags.json', 'utf8'));
var writePostsToFile = function () {
    fs.writeFileSync(__dirname + '/db/posts.json', JSON.stringify(posts));
    fs.writeFileSync(__dirname + '/db/tags.json', JSON.stringify(tags));
};
app.put('/create-post', function (req, res) {
    var _a = req.body, markdown = _a.markdown, articleTags = _a.tags, menu = _a.menu, title = _a.title;
    var link = title.replaceAll(/\s/g, '-').replaceAll(/\//g, '') + Date.now();
    posts.push({
        markdown: markdown,
        tags: articleTags,
        menu: menu,
        title: title,
        date: Date.now(),
        views: 1,
        link: link
    });
    for (var _i = 0, articleTags_1 = articleTags; _i < articleTags_1.length; _i++) {
        var tag = articleTags_1[_i];
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    }
    writePostsToFile();
    res.status(200);
    res.json({ link: link });
});
app.put('/update-post', function (req, res) {
    var _a = req.body, markdown = _a.markdown, menu = _a.menu, link = _a.link;
    var post = posts.find(function (post) { return post.link === link && post.link !== 'Упс.-Данной-статьи-не-существует'; });
    if (!post) {
        res.status(400);
        res.send();
        return;
    }
    post.menu = menu;
    post.markdown = markdown;
    writePostsToFile();
    res.status(200);
    res.send();
});
app.get('/posts', function (req, res) {
    res.json(posts);
});
app.get('/random', function (req, res) {
    var notFoundPost = posts.filter(function (post) { return post.title !== 'Упс. Данной статьи не существует'; });
    var postId = Math.floor(Math.random() * notFoundPost.length);
    res.json(notFoundPost.find(function (_, index) { return postId === index; }));
});
app.get('/post/:link', function (req, res) {
    var notFoundPost = posts.find(function (post) { return post.title === 'Упс. Данной статьи не существует'; });
    res.json(posts.find(function (post) { return post.link === req.params.link; }) || notFoundPost);
});
app.get('/post-tags', function (req, res) {
    var tagList = [];
    tags.forEach(function (tag) {
        var taggedPosts = posts.filter(function (post) { return post.tags[0] === tag; });
        tagList.push({
            tagName: tag,
            articles: taggedPosts.map(function (taggedPost) { return ({
                link: taggedPost.link,
                title: taggedPost.title
            }); })
        });
    });
    res.json(tagList.filter(function (tagItem) { return tagItem.articles.length; }));
});
app.post('/new-post-info', function (req, res) {
    var activeLink = req.body.activeLink;
    var notViewedPosts = posts.filter(function (post) { return post.title !== 'Упс. Данной статьи не существует' && post.link !== activeLink; });
    var postId = Math.floor(Math.random() * notViewedPosts.length);
    var post = notViewedPosts.find(function (_, index) { return postId === index; });
    res.json({ title: post.title, link: post.link });
});
server.listen(process.env.PORT || 5000, function () { return console.log('server start'); });
