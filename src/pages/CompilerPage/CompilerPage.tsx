import React  from 'react';
import { observer } from 'mobx-react-lite';
import Article from '@components/Article/Article';
import ReactCodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useStores } from '@hooks/useStores';
import { useInput } from '@hooks/useInput';
import { useDoc } from '@hooks/useDoc';
import { withHeader } from '@hocs/withHeader';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useHeightAnimate } from '@hooks/useHeightAnimate';
import Button from '@shared/Button/Button';
import { useToggle } from '@hooks/useToggle';

import {CompilerPageStyled, Editor, Preview, Task, Frame} from './CompilerPage.styles';

const CompilerPage: React.FC = observer(() => {
  const [isShowTask, toggleIsShowTask] = useToggle(true);
  const {compilerStore, settingsStore}= useStores();
  const [code, setCode] = useInput(compilerStore.initialCode);
  const ref = useHeightAnimate<HTMLDivElement>(isShowTask, {deps: [compilerStore.taskText]});
  const doc = useDoc(code);

  return (
    <CompilerPageStyled>
      <Editor>
        <ReactCodeMirror
          value={code}
          onChange={setCode}
          theme={settingsStore.theme === 'dark'? dracula: githubLight}
          onStatistics={data => console.log(data)}
          extensions={[javascript()]}
          height='calc(100vh - 85px)'
        />
        <Preview>
          {compilerStore.taskText &&<Task>
            <Button text={isShowTask? 'Скрыть задачу': 'Открыть задачу'} onClick={toggleIsShowTask}/>
            <div ref={ref} style={{padding: '0 10px', transition: '.3s'}}>
              <Article markdown={compilerStore.taskText}/>
            </div>
              </Task>}
          <Frame>
            <iframe title='preview' className='preview' srcDoc={doc}/>
          </Frame>
        </Preview>
      </Editor>
    </CompilerPageStyled>
  );
});

export default withHeader(CompilerPage);