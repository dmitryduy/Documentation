import { IQuizQuestion } from '../global.typings';

import { quizChecker } from './checkQuiz';
import { showToast } from './showToast';

export const parseQuizJSON = (string: string) => {
  try {
    const questions: IQuizQuestion[] = JSON.parse(string);

    for (const question of questions) {
      if (!question.textCorrectAnswer) question.textCorrectAnswer = '';
    }

    const checkedQuiz = quizChecker.checkQuiz(questions, 0);
    if (checkedQuiz.error) {
      showToast(checkedQuiz.error);
      return null;
    }

    return questions;
  } catch (e) {
    showToast('Некорректный квиз');
    return null;
  }
};