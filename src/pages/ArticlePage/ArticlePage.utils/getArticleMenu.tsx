import React from 'react';
import { HashLink } from 'react-router-hash-link';

import { Menu } from '../../../global.typings';
import Article from '../../../components/Article/Article';
import { unifyMenuLinks } from '../../../utils/unifyMenuLinks';

const getArticleItem = (itemValue: string) => {
  return (
    <li key={itemValue}>
      <HashLink to={`#${unifyMenuLinks(itemValue)}`}>
        <Article markdown={itemValue}/>
      </HashLink>
    </li>
  );
};

export const getArticleMenu = (menu: Menu) => {
  const result = [];

  for (const item of menu) {
    result.push(typeof item === 'string' ? getArticleItem(item) : getArticleMenu(item));
  }

  return <ul key={menu.toString()}>{result}</ul>;
};
