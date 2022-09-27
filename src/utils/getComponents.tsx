import React, { Children } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Title from '../shared/Title/Title';
import Subtitle from '../shared/Subtitle/Subtitle';
import SecondTitle from '../shared/SecondTitle/SecondTitle';
import Paragraph from '../shared/Paragraph/Paragraph';
import Link from '../shared/Link/Link';
import CodeText from '../shared/CodeText/CodeText';
import List from '../shared/List/List';
import Video from '../shared/Video/Video';
import Image from '../shared/Image/Image';
import InfoBlock from '../shared/InfoBlock/InfoBlock';
import { InfoBlockType } from '../global.typings';
import Table from '../shared/Table/Table';

interface Props {
  type?: string;
  id: string;
  href?: string;
  children: React.ReactNode;
  language?: string;
  src?: string;
}

export const getComponents = (): {[key in string]: React.FC<Props>} => ({
  h1({children}) {
    return <Title>{children}</Title>;
  },
  h2({children, id}) {
    return <Subtitle id={id}>{children}</Subtitle>;
  },
  h3({children, id}) {
    return <SecondTitle id={id}>{children}</SecondTitle>;
  },
  p({children}) {
    return <Paragraph>{children}</Paragraph>;
  },
  a({children, href}) {
    return <Link href={href || '#'}>{children}</Link>;
  },
  code({children, type}) {
    return type ? <SyntaxHighlighter
      children={String(children).replace(/^\n/, '')}
      style={dracula}
      language={type}
      PreTag="div"
    /> : <p>Для кода нужен тип языка</p>;
  },
  pre({children}) {
    return <CodeText>{children}</CodeText>;
  },
  ul({children}) {
    return <List as="ul">{children}</List>;
  },
  ol({children}) {
    return <List as="ol">{children}</List>;
  },
  img({src}) {
    if (!src) return null;
    return <Image  src={src} alt={src}/>;
  },
  div({type, children}) {
    switch (type) {
    case 'video':
      // eslint-disable-next-line no-case-declarations
      const childrenArray = Children.toArray(children);
      if (childrenArray.length !== 1 || typeof childrenArray[0] !== 'string') return null;
      return <Video src={childrenArray[0]}/>;
    case 'info':
      return <InfoBlock type="info" title="Информация">{children}</InfoBlock>;
    case 'alert':
      return <InfoBlock type="alert" title="Внимание">{children}</InfoBlock>;
    case 'tip':
      return <InfoBlock type="tip" title="Подсказка">{children}</InfoBlock>;
    case 'caution':
      return <InfoBlock type="caution" title="Предупреждение">{children}</InfoBlock>;
    default:
      return <>{children}</>;
    }
  },
  table({children}) {
    return <Table>{children}</Table>;
  }
});