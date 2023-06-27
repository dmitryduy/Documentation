import React from 'react';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import cn from 'classnames';

import {ReactComponent as CopySvg} from '../../assets/images/Copy.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useTheme } from '../../hooks/useTheme';

import {CodeStyled} from './Code.styles';

interface ICodeProps {
    code: string;
    language: string | null;
    canCopy?: boolean;
}


const Code: React.FC<ICodeProps> = ({code, language, canCopy = true}) => {
  const {theme} = useTheme();
  return (
    <CodeStyled>
      <SyntaxHighlighter
        className={cn('scroll', {canCopy})}
        children={code.replace(/\n$/, '')}
        style={theme === 'light' ? oneLight : dracula}
        language={language || 'js'}
        PreTag="div"
        customStyle={{paddingTop: 22}}
      />
      {canCopy && <CopySvg onClick={() => copyToClipboard(code)} className="copy-icon"/>}
    </CodeStyled>
  );
};

export default Code;
