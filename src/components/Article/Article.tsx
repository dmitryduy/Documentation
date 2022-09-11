import React  from 'react';
import ReactMarkdown from 'react-markdown';

import { useMarkdownComponents } from '../../hooks/useMarkdownComponents';

interface IArticleProps {
    markdown: string
}

const Article: React.FC<IArticleProps> = React.memo(({markdown}) => {
  const components = useMarkdownComponents();
  return (
    <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
  );
});

export default Article;