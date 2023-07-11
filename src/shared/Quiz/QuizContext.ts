import { createContext } from 'react';
import { useInput } from '@hooks/useInput';

import { IQuizQuestion, QuestionType } from '@/global.typings';

interface IQuizContext extends IQuizQuestion {
  inputValue: string;
  setInputValue: (ReturnType<typeof useInput>[1]);
  userAnswers: string[];
}

export const QuizContext = createContext<IQuizContext>({
  type: QuestionType.MULTI_SELECT,
  codeLanguage: '',
  text: '',
  options: [],
  id: 0,
  inputValue: '',
  setInputValue: () => void 0,
  userAnswers: [],
  position: 1,
  textCorrectAnswer: '',
  code: '',
  isShuffleOptions: true,
});