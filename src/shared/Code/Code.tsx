import React from 'react';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { useAppSelector } from '../../hooks/useAppSelector';
import {ReactComponent as CopySvg} from '../../assets/images/Copy.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';

import {CodeStyled} from './Code.styles';

interface ICodeProps {
    code: string;
    language: string;
}

const Code: React.FC<ICodeProps> = ({code, language}) => {
  const theme = useAppSelector(state => state.settings.theme);
  return (
    <CodeStyled>
      <SyntaxHighlighter
        children={code.replace(/\n$/, '')}
        style={theme === 'light' ? oneLight : dracula}
        language={language}
        PreTag="div"
      />
      <CopySvg onClick={() => copyToClipboard(code)} className="copy-icon"/>
    </CodeStyled>
  );
};

export default Code;
