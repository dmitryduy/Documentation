import { IQuizQuestion, QuestionType } from '../../global.typings';

export const getTemplateQuestion = (initial: Partial<IQuizQuestion> = {}): IQuizQuestion => (
  {
    text: 'Новый вопрос',
    options: [],
    id: Date.now() + Math.floor(Math.random() * 10000),
    type: QuestionType.TEXT,
    codeLanguage: '',
    code: '',
    position: 1,
    textCorrectAnswer: '',
    isShuffleOptions: true,
    ...initial
  }
);