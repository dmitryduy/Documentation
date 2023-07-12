import React, { useEffect, useMemo, useState } from 'react';
import Article from '@components/Article/Article';
import Button from '@shared/Button/Button';
import AceEditor from 'react-ace';
import { useInput } from '@hooks/useInput';

import {TaskEditorStyled, Editor, Preview} from './TaskEditor.styles';

import { ITask } from '@/global.typings';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/ext-language_tools";

const TaskEditor: React.FC<ITask> = ({taskText, initialCode, hiddenCode=''}) => {
  const [isStart, setIsStart] = useState(false);
  const [code, setCode] = useInput('\n' + initialCode);
  const [isCheckCode, setIsCheckCode] = useState(false);

  useEffect(() => {
    isCheckCode && setIsCheckCode(false);
  }, [code]);

  const doc = useMemo(() => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    }
    *::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: #444444;
      border-radius: 2px;
    }

    *::-webkit-scrollbar-thumb {
      width: 4px;
      height: 4px;
      background-color:#686868;
      border-radius: 2px;
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: #a7a7a7;
    }
</style>
  </head>
  <div class="main"></div>
  <body>
    <script>
    const div = document.querySelector('.main');
    const prevConsole = console.log;
    console.log = function(...text) {
      const color = text[0];
     if (color === 'red' || color === 'green') {
       div.innerHTML+= \`<div style="font-size: 20px;color:\${color}">\${text.slice(1).reduce((prev, elem) => \`\${prev} \${JSON.stringify(elem)}\`, '')}</div>\`;
     } else {
     div.innerHTML+= \`<div style="color:white">\${text.reduce((prev, elem) => \`\${prev} \${JSON.stringify(elem)}\`, '')}</div>\`;
     }   
    }
    try{
    ${code}
    ${isCheckCode? hiddenCode: ''}
    }catch(e) {
      console.log('red', e);
    } finally{
    console.log = prevConsole;
    }
    </script>
  </body>
</html>`, [code, hiddenCode, isCheckCode]);

  useEffect(() => setIsStart(false), [taskText, initialCode, hiddenCode]);
  return (
    <TaskEditorStyled>
      <Article markdown={taskText}/>
      {!isStart && <Button text='Начать решать' onClick={() => setIsStart(true)}/>}
      {isStart && <Editor>
        {hiddenCode !== '' && !isCheckCode && <Button text='Проверить на тестах' onClick={() => setIsCheckCode(true)}/>}
        <AceEditor
        mode="javascript"
        theme="terminal"
        name="js"
        onChange={setCode}
        fontSize={20}
        width='100%'
        maxLines={20}
        minLines={20}
        showPrintMargin
        value={code}
        showGutter
        setOptions={{
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: 2,
        }}/>
        <Preview>
          <iframe title='preview' className='preview' srcDoc={doc}/>
        </Preview>
        </Editor>
        }
    </TaskEditorStyled>
  );
};

export default TaskEditor;