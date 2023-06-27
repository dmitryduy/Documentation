import { createContext } from 'react';

import { IQuizQuestion } from '../../global.typings';
import { useInput } from '../../hooks/useInput';

interface IQuizContext extends IQuizQuestion {
  inputValue: string;
  setInputValue: ReturnType<typeof useInput>[1];
  userAnswers: string[];
}

export const QuizContext = createContext<IQuizContext>({
  type: 'multiselect',
  codeLanguage: '',
  question: '',
  options: [],
  id: 0,
  inputValue: '',
  setInputValue: () => void 0,
  userAnswers: [],
  position: 0
});