import React from 'react';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import {ReactComponent as CopySvg} from '../../assets/images/Copy.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useStores } from '../../hooks/useStores';
import { useToast } from '../../hooks/useToast';

import {CodeStyled} from './Code.styles';

interface ICodeProps {
    code: string;
    language: string | null;
    canCopy?: boolean;
}


const Code: React.FC<ICodeProps> = observer(({code, language, canCopy = true}) => {
  const {settingsStore: {theme}} = useStores();
  const showToast = useToast();
  return (
    <CodeStyled  className={cn({canCopy})}>
      <SyntaxHighlighter
        children={code.replace(/\n$/, '')}
        style={theme === 'light' ? oneLight : dracula}
        language={language || 'js'}
        PreTag="div"
        customStyle={{paddingTop: 22}}
      />
      {canCopy && <CopySvg onClick={() => copyToClipboard(code, showToast, showToast)} className="copy-icon"/>}
    </CodeStyled>
  );
});

export default Code;
