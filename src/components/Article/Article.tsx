import React from 'react';

import { useProcessor } from '../../hooks/useProcessor';


interface IArticleProps {
    markdown: string;
}

const Article: React.FC<IArticleProps> = React.memo(({markdown}) => {
  console.log(useProcessor(markdown));
  return useProcessor(markdown);
});

export default Article;