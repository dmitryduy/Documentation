import React  from 'react';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';

import { useMarkdownComponents } from '../../hooks/useMarkdownComponents';
import { customMarkdownBlocksPlugin } from '../../utils/customMarkdownBlocksPlugin';

interface IArticleProps {
    markdown: string;
}


const Article: React.FC<IArticleProps> = React.memo(({markdown}) => {
  const components = useMarkdownComponents();
  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[customMarkdownBlocksPlugin, remarkDirective, remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
});

export default Article;