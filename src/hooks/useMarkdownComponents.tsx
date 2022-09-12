import { NormalComponents } from 'react-markdown/lib/complex-types';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import Title from '../shared/Title/Title';
import Subtitle from '../shared/Subtitle/Subtitle';
import SecondTitle from '../shared/SecondTitle/SecondTitle';
import { InfoBlockType } from '../global.typings';
import InfoBlock from '../shared/InfoBlock/InfoBlock';
import Paragraph from '../shared/Paragraph/Paragraph';
import Link from '../shared/Link/Link';
import CodeText from '../shared/CodeText/CodeText';
import List from '../shared/List/List';


export const useMarkdownComponents = ():
  Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> => {
  return useMemo(() => ({
    h1({children}) {
      return <Title>{children}</Title>;
    },
    h2({children}) {
      if (!children) return null;
      return <Subtitle id={typeof children[0] === 'string' ? children[0] : ''}>{children}</Subtitle>;
    },
    h3({children}) {
      if (!children) return null;
      return <SecondTitle id={typeof children[0] === 'string' ? children[0] : ''}>{children}</SecondTitle>;
    },
    p(data) {
      const children = data.children;
      if (typeof children[0] === 'string') {
        const match = children[0].match(/^(alert|tip|info)\[(.*)\]/);
        if (match) {
          children[0] = children[0].slice(match[0].length);
        }
      }
      return <Paragraph>{children}</Paragraph>;
    },
    a({children, href}) {
      return <Link href={href || '#'}>{children}</Link>;
    },
    code({children, className}) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={dracula}
        language={match[1]}
        PreTag="div"
      /> : <CodeText fontWeight="normal">{children}</CodeText>;
    },
    ul({children}) {
      return <List>{children}</List>;
    },
    div({node, children}) {
      const firstChild = node.children[0];
      console.log(firstChild);
      if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'p') {
        const match = (firstChild.children[0] && firstChild.children[0] as {value?: string})
          ?.value?.match(/^(alert|tip|info)\[(.*)\]/);
        if (match) {
          const type = match[1] as InfoBlockType;
          const title = match[2];
          return <InfoBlock type={type} title={title}>{children}</InfoBlock>;
        }

      }
      return <div>{children}</div>;
    }
  }), []);
};
