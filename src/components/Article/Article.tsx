import React  from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';

import { useMarkdownComponents } from '../../hooks/useMarkdownComponents';

interface IArticleProps {
    markdown: string
}

const Article: React.FC<IArticleProps> = React.memo(({markdown}) => {
  const components = useMarkdownComponents();
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkDirective, remarkGfm ]}>{markdown}</ReactMarkdown>
  );
});

export default Article;