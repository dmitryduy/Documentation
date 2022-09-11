import React from 'react';

import { Menu } from '../../../global.typings';

const getArticleItem = (itemValue: string) => {
  return (
    <li key={itemValue}>
      <a href={`#${itemValue}`}>
        {itemValue}
      </a>
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
