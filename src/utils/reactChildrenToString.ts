import React, { ReactElement } from 'react';

export const reactChildrenToString = (children: React.ReactNode) => {
  let str = '';

  React.Children.forEach(children, child => {
    if (React.Children.count(child) > 1) str += reactChildrenToString(child);
    else {
      if (!child) return;
      if (['string', 'number', 'boolean'].includes(typeof child)) {
        str += (child || '').toString();
      } else {
        str += (child as ReactElement)!.props.children;
      }
    }
  });
  return str;
};
