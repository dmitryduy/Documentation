import React from 'react';
import Article from '@components/Article/Article';
import Button from '@shared/Button/Button';
import { observer } from 'mobx-react-lite';
import { useStores } from '@hooks/useStores';
import { useNavigate } from 'react-router-dom';

import {TaskEditorStyled} from './TaskEditor.styles';

import { ITask } from '@/global.typings';

const TaskEditor: React.FC<ITask> = observer((props) => {
  const {compilerStore} = useStores();
  const navigate = useNavigate();

  const onCompilerPage = () => {
    compilerStore.setState(props);
    navigate('/compiler');
  }

  return (
    <TaskEditorStyled>
      <Article markdown={props.taskText}/>
      <Button text='Начать решать' onClick={onCompilerPage}/>
    </TaskEditorStyled>
  );
});

export default TaskEditor;