import { makeAutoObservable } from 'mobx';

import { ITask } from '@/global.typings';

class CompilerStore{
  taskText = '';
  hiddenCode = '';
  initialCode = '';
  constructor() {
    makeAutoObservable(this);
  }

  setState(task: ITask) {
    this.taskText = task.taskText;
    this.hiddenCode = task.hiddenCode;
    this.initialCode = task.initialCode;
  }
}

export default new CompilerStore();