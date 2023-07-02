import { useState } from 'react';

import { IQuizQuestion } from '../../global.typings';
import { showTooltip } from '../../utils/showTooltip';
import { quizChecker } from '../../utils/checkQuiz';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { conditionalExecution } from '../../utils/conditionalExecution';
import { stringifyQuizJSON } from '../../utils/parseQuizJSON';

import { getTemplateQuestion } from './QuizCreatorPopup.utils';

export const useQuizPopup = () => {
  const [questions, setQuestions] = useState<IQuizQuestion[]>(() => [getTemplateQuestion()]);
  const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id);

  const activeQuestion = questions.find(question => question.id === activeQuestionId) || {} as IQuizQuestion;

  const updatePositions = () => {
    setQuestions(prev => [...prev.map((question, idx) => ({...question, position: idx + 1}))]);
  };

  const createQuestion = () => {
    const newQuestion = getTemplateQuestion({position: questions.length + 1});
    setQuestions(prev => [...prev, newQuestion]);
    setActiveQuestionId(newQuestion.id);
    updatePositions();
  };

  const deleteQuestion = (id: number) => {
    if (questions.length <= 1) {
      showTooltip('Должет быть хотя бы 1 вопрос');
      return;
    }
    setQuestions(prev => {
      const without = prev.filter(question => question.id !== id);
      setActiveQuestionId(without[0].id);
      return without;
    });
    updatePositions();
  };

  const createQuiz = () => {
    const checkedQuiz = quizChecker.checkQuiz(questions, 0);

    conditionalExecution(!!checkedQuiz.error,
      () => showTooltip(checkedQuiz.error),
      () => {
        copyToClipboard(stringifyQuizJSON(checkedQuiz.value));
        setQuestions(() => {
          const newQuiz = [getTemplateQuestion()];
          setActiveQuestionId(newQuiz[0].id);
          return newQuiz;
        });
      });
  };

  const changeActiveQuestion = (id: IQuizQuestion['id']) => setActiveQuestionId(id);

  return {
    questions,
    activeQuestion,
    createQuestion,
    deleteQuestion,
    createQuiz,
    changeActiveQuestion,
    setQuestions
  };
};


