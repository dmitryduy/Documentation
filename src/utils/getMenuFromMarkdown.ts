import { unifyMenuLinks } from './unifyMenuLinks';

import { Menu } from '@/global.typings';


export const getMenuFromMarkdown = (markdown: string) => {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...markdown.matchAll(/##.+\n/g)].reduce((prev, curr) => {
    const match = curr[0];

    if (match.startsWith('### ')) {
      const last = prev[prev.length - 1];
      if (Array.isArray(last)) {
        last.push(unifyMenuLinks(match, false));
        return prev;
      }
      return [...prev, [unifyMenuLinks(match, false)]];
    }
    if (match.startsWith('## ')) {
      return [...prev, unifyMenuLinks(match, false)];
    }
    return prev;
  }, [] as Menu);
};
