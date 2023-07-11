import { useEffect, useState } from 'react';
import { useInput } from '@hooks/useInput';

import { getAnswerScore, getInitialQuestion, getMaxScore } from './Quiz.utils';

import { IQuizQuestion, QuestionType } from '@/global.typings';

export enum QuizState {
  NOT_STARTED,
  IN_PROGRESS,
  MISTAKE_DISPLAY,
  RESULT
}

export const useQuiz = (
  questions: IQuizQuestion[],
  inputValue: string,
  setInputValue: ReturnType<typeof useInput>[1]) => {
  const [quizState, setQuizState] = useState(QuizState.NOT_STARTED);
  const [currentQuestion, setCurrentQuestion] = useState(getInitialQuestion(questions[0]));
  const [score, setScore] = useState({max: getMaxScore(questions), total: 0});

  const startQuiz = () => {
    setScore({...score, total: 0});
    setCurrentQuestion(getInitialQuestion(questions[0]));
    setQuizState(QuizState.IN_PROGRESS);
    setInputValue('');
  };

  const updateUserAnswers = (answers: string[]) => {
    setCurrentQuestion({...currentQuestion, userAnswers: [...answers]});
  };

  const checkAnswer = () => {
    const {type, options, textCorrectAnswer} = currentQuestion;
    const correctAnswers = options.filter(option => option.isCorrect).map(option => option.value);

    if (type === QuestionType.TEXT) {
      setScore({...score, total: score.total + getAnswerScore([textCorrectAnswer], [inputValue])});
    } else {
      setScore({...score, total: score.total + getAnswerScore(correctAnswers, currentQuestion.userAnswers)});
    }

    setInputValue(textCorrectAnswer);
    setQuizState(QuizState.MISTAKE_DISPLAY);
  };

  const nextQuestion = () => {
    if (currentQuestion.position === questions.length) {
      setQuizState(QuizState.RESULT);
      return;
    }
    setInputValue('');
    setCurrentQuestion(getInitialQuestion(questions[currentQuestion.position]));
    setQuizState(QuizState.IN_PROGRESS);
  };

  const startAgain = () => setQuizState(QuizState.NOT_STARTED);

  useEffect(() => {
    setQuizState(QuizState.NOT_STARTED);
    setScore({...score, max: getMaxScore(questions)});
  }, [questions]);

  return {
    currentQuestion,
    score,
    quizState,
    methods: {startQuiz, updateUserAnswers, checkAnswer, nextQuestion, startAgain}
  };
};