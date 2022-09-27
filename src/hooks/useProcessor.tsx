import React, { Fragment, useLayoutEffect, useState } from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';

import { getComponents } from '../utils/getComponents';

export const useProcessor = (text: string) => {
  const [Content, setContent] = useState(<></>);

  useLayoutEffect(() => {
    unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypeSanitize)
      .use(rehypeReact, {
        createElement: React.createElement,
        Fragment,
        components: getComponents()
      })
      .process(text)
      .then(file => {
        setContent(file.result);
      });
  }, [text]);

  return Content;
};