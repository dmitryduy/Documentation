import { IQuizQuestion } from '../global.typings';

import { removeDuplicate } from './removeDuplicate';

export const checkQuiz = (questions: IQuizQuestion[]) => {
  if (!questions || questions.length === 0) {
    return 'Нет вопросов викторины';
  }

  if (questions.length > 50) {
    return 'Максимальное количество вопросов не должно превышать 50';
  }
  for (const question of questions) {
    if (!question.question.trim()) {
      return 'Вопрос не должен быть пустой';
    }
    if (question.options.length !== removeDuplicate(question.options).length) {
      return 'Не должно быть дублирующих ответов в одном вопросе';
    }
    if (question.options.length > 10) {
      return 'Максимальное количество ответов на вопрос должно быть 10';
    }
    if (question.type === 'single') {
      if (question.options?.filter(option => option.isCorrect)?.length !== 1) {
        return 'У вопросов с одиночным ответом должен быть один правильный ответ';
      }
    }
    if (question.type === 'text') {
      if (!question.textCorrectAnswer) {
        return 'Задайте ответ на текстовый вопрос';
      }
    }
    if (question.type === 'multiselect') {
      if (question.options?.filter(option => option.isCorrect)?.length < 1) {
        return 'У вопросов должен быть хотя бы один правильный ответ';
      }
    }
    if (question.codeLanguage && !question.code || question.code && !question.codeLanguage) {
      return 'Вопрос с кодом должен иметь язык';
    }
  }

  return false;
};