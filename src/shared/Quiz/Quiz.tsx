import React from 'react';

import { IQuizQuestion, QuestionType } from '../../global.typings';
import { useInput } from '../../hooks/useInput';
import Paragraph from '../Paragraph/Paragraph';
import { quizChecker } from '../../utils/checkQuiz';

import QuizStep from './QuizStep/QuizStep';
import { QuizButton, QuizStyled, QuizTitle } from './Quiz.styles';
import { QuizContext } from './QuizContext';
import { QuizState, useQuiz } from './Quiz.hooks';
import { getGradeByScore } from './Quiz.utils';

interface IQuizProps {
  questions: IQuizQuestion[];
  title: string;
}

const Quiz: React.FC<IQuizProps> = ({questions, title}) => {
  const [inputValue, setInputValue] = useInput('');
  const {currentQuestion, quizState, score, methods} = useQuiz(questions, inputValue, setInputValue);

  const toggleAnswer = (answer: string) => {
    if (currentQuestion.type === QuestionType.SINGLE_SELECT) {
      methods.updateUserAnswers([answer]);
      return;
    }
    if (currentQuestion.userAnswers.includes(answer)) {
      methods.updateUserAnswers(currentQuestion.userAnswers.filter(userAnswer => userAnswer !== answer));
    } else {
      methods.updateUserAnswers([...currentQuestion.userAnswers, answer]);
    }
  };

  const checkedQuiz = quizChecker.checkQuiz(questions, 0);

  if (checkedQuiz.error) {
    return <QuizStyled><Paragraph>{checkedQuiz.error}</Paragraph></QuizStyled>;
  }

  if (quizState === QuizState.NOT_STARTED) {
    return (
      <QuizStyled>
        <QuizTitle>Пройдите тест: "{title}"</QuizTitle>
        <QuizButton onClick={methods.startQuiz}>Начать</QuizButton>
      </QuizStyled>);
  }

  if (quizState === QuizState.RESULT) {
    return (
      <QuizStyled>
        <QuizTitle>Результаты теста: "{title}"</QuizTitle>
        <QuizTitle>{getGradeByScore(score.total, score.max)}</QuizTitle>
        <QuizTitle>Счет: {score.total}/{score.max}</QuizTitle>
        <QuizButton onClick={methods.startAgain}>Попробовать заново</QuizButton>
      </QuizStyled>);
  }

  return (
    <QuizStyled>
      <QuizContext.Provider value={{...currentQuestion, setInputValue, inputValue}}>
        <QuizStep
          questionsCount={questions.length}
          onAnswerClick={answer => toggleAnswer(answer)}
          isShowMistake={quizState === QuizState.MISTAKE_DISPLAY}
        />
      </QuizContext.Provider>
      <QuizButton onClick={quizState === QuizState.MISTAKE_DISPLAY ? methods.nextQuestion : methods.checkAnswer}>
        {quizState === QuizState.MISTAKE_DISPLAY ? 'Продолжить' : 'Проверить'}
      </QuizButton>
    </QuizStyled>
  );
};

export default Quiz;