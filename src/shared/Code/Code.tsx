import React from 'react';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {ReactComponent as CopySvg} from '../../assets/images/Copy.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useTheme } from '../../hooks/useTheme';

import {CodeStyled} from './Code.styles';

interface ICodeProps {
    code: string;
    language: string;
}

const Code: React.FC<ICodeProps> = ({code, language}) => {
  const {theme} = useTheme();
  return (
    <CodeStyled>
      <SyntaxHighlighter
        className="scroll"
        children={code.replace(/\n$/, '')}
        style={theme === 'light' ? oneLight : dracula}
        language={language}
        PreTag="div"
        customStyle={{paddingTop: 22}}
      />
      <CopySvg onClick={() => copyToClipboard(code)} className="copy-icon"/>
    </CodeStyled>
  );
};

export default Code;
