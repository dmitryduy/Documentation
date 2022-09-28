# API


```
POST /create-post
PUT /update-post
GET /posts
GET /random
GET /random/:visitedLink
GET /post/:link
GET /post-tags
POST /register
POST /login
```

## POST /create-post
Возвращаемое значение:
```{error: null | string, link: null | string}```

Либо `error = null`, либо `link = null`

## PUT /update-post
Возвращаемое значение:
```{error: null | string}```

## GET /posts
Возвращаемое значение:
```{error: null | string, posts: null | IPost[]}```

Либо `error = null`, либо `posts = null`

## GET /random
Возвращаемое значение:
```{error: null | string, post: null | IPost}```

Либо `error = null`, либо `post = null`

## GET /random/:visitedLink
Возвращаемое значение:
```{error: null | string, title: string, link: string}```

Либо `error = null`, либо `title = null, link = null`

## GET /post/:link
Возвращаемое значение:
```{error: null | string, post: null | IPost}```

Либо `error = null`, либо `post = null`

## GET /post-tags
Возвращаемое значение:
```{error: null | string, tags: null | ITagList}```

Либо `error = null`, либо `tags = null`

## POST /register
Возвращаемое значение:
```{error:string | null, login: string | null}```

Либо `error = null`, либо `login = null`
{error:string | null, login: string | null}

## POST /login
Возвращаемое значение:
```{error:string | null, login: string | null}```

Либо `error = null`, либо `login = null`
{error:string | null, login: string | null}

## Типы

```ts
export interface ITagList {
  tagName: string;
  articles: {
    link: string;
    title: string;
  }[]
}

interface IPost {
  _id: string;
  markdown: string;
  tags: string[];
  menu: (string | string[])[];
  title: string;
  date: number;
  views: number;
  link: string;
  owner: string;
}
```