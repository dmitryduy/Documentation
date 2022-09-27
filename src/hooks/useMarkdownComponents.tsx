import { NormalComponents } from 'react-markdown/lib/complex-types';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula,  oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useMemo } from 'react';

import Title from '../shared/Title/Title';
import Subtitle from '../shared/Subtitle/Subtitle';
import SecondTitle from '../shared/SecondTitle/SecondTitle';
import { InfoBlockType } from '../global.typings';
import InfoBlock from '../shared/InfoBlock/InfoBlock';
import Paragraph from '../shared/Paragraph/Paragraph';
import Link from '../shared/Link/Link';
import CodeText from '../shared/CodeText/CodeText';
import List from '../shared/List/List';
import Image from '../shared/Image/Image';
import Video from '../shared/Video/Video';
import Table from '../shared/Table/Table';


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

      for (let i = 0; i < children.length; i++) {
        if (typeof children[i] === 'string') {
          children[i] = (children[i] as string).replaceAll(':::', '');
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
        style={match[1] === 'md' ? oneLight : dracula}
        language={match[1]}
        PreTag="div"
      /> : <CodeText>{children}</CodeText>;
    },

    ul({children}) {
      return <List as="ul">{children}</List>;
    },
    ol({children}) {
      return <List as="ol">{children}</List>;
    },
    img({src, alt}) {
      if (!alt || !src) return null;

      if (alt.startsWith('видео')) {
        return <Video src={src}/>;
      }
      return <Image src={src} alt={alt}/>;
    },
    div(data) {
      const {title, className, children} = data;

      if (title) {
        return <InfoBlock type={className as InfoBlockType} title={title || ''}>{children}</InfoBlock>;
      }

      return <div>{children}</div>;
    },
    table({children}) {
      return <Table>{children}</Table>;
    }
  }), []);
};
