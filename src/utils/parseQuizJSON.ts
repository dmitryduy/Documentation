import { IQuizQuestion } from '../global.typings';

import { quizChecker } from './checkQuiz';

export const parseQuizJSON = (string: string, onError: (error: string) => void) => {
  try {
    const questions: IQuizQuestion[] = JSON.parse(string
      .replaceAll('"isCorrect":"true"', '"isCorrect":true')
      .replaceAll('"isCorrect":"false"', '"isCorrect":false'));

    for (const question of questions) {
      if (!question.textCorrectAnswer) question.textCorrectAnswer = '';
    }

    const checkedQuiz = quizChecker.checkQuiz(questions, 0);
    if (checkedQuiz.error) {
      onError(checkedQuiz.error);
      return null;
    }

    return questions;
  } catch (e) {
    onError('Некорректный квиз');
    return null;
  }
};

export const stringifyQuizJSON = (quiz: IQuizQuestion[]) => {
  return JSON.stringify(quiz, (key, value) => {
    if (key === 'isCorrect') return value.toString();
    if (typeof value === 'string') return value.replaceAll('"', '\'');
    return value;
  });
};