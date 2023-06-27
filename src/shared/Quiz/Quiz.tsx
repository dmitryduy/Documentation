import React, { useEffect, useRef, useState } from 'react';

import { IQuizQuestion } from '../../global.typings';
import { shuffle } from '../../utils/shuffle';
import { useInput } from '../../hooks/useInput';
import { checkQuiz } from '../../utils/checkQuiz';
import Paragraph from '../Paragraph/Paragraph';
import { removeDuplicate } from '../../utils/removeDuplicate';

import QuizStep from './QuizStep/QuizStep';
import { QuizStyled, QuizButton, QuizTitle } from './Quiz.styles';
import { QuizContext } from './QuizContext';
import QuizAnswers from './QuizAnswers/QuizAnswers';


interface IQuizProps {
  questions: IQuizQuestion[];
  title: string;
}

const Quiz: React.FC<IQuizProps> = ({questions, title}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isShowMistake, setIsShowMistake] = useState(false);
  const [inputValue, setInputValue] = useInput('');
  const totalStoreRef = useRef(0);
  const [isFinish, setIsFinish] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const shuffleOptionsRef = useRef<IQuizQuestion['options']>([]);

  const currentQuestion = questions[currentQuestionIdx];

  const startQuiz = () => {
    totalStoreRef.current = 0;
    setCurrentQuestionIdx(0);
    setIsFinish(false);
    setIsStart(false);
    setIsShowMistake(false);
    setUserAnswers([]);
    setInputValue('');
    shuffleOptionsRef.current = shuffle(removeDuplicate(questions[0]?.options || []));
  };

  useEffect(() => {
    startQuiz();
    setIsStart(true);
  }, [questions]);

  const toggleAnswers = (answer: string) => {
    if (questions[currentQuestionIdx].type === 'single') {
      setUserAnswers([answer]);
      return;
    }

    if (userAnswers.includes(answer)) {
      setUserAnswers(userAnswers.filter(item => item !== answer));
    } else {
      setUserAnswers([...userAnswers, answer]);
    }
  };

  const checkAnswer = () => {
    void 0;
    const {type, options, textCorrectAnswer} = questions[currentQuestionIdx];
    const correctAnswers = options.filter(option => option.isCorrect);
    if (type === 'text') {
      if (inputValue === textCorrectAnswer) {
        totalStoreRef.current++;
      }
      setInputValue(textCorrectAnswer || '');
    } else {
      for (const answer of correctAnswers) {
        console.log(answer, userAnswers);
        if (userAnswers.includes(answer.value)) {
          totalStoreRef.current++;
        }
      }
    }
    setIsShowMistake(true);
  };

  const nextAnswer = () => {
    setIsShowMistake(false);
    setUserAnswers([]);
    setInputValue('');
    if (currentQuestionIdx === questions.length - 1) {
      setIsFinish(true);
      return;
    }
    setCurrentQuestionIdx(prev => {
      shuffleOptionsRef.current = shuffle(removeDuplicate(questions[prev + 1].options));
      return prev + 1;
    });
  };

  const error = checkQuiz(questions);
  if (error) {
    return (
      <QuizStyled>
        <Paragraph>{error}</Paragraph>
      </QuizStyled>);
  }

  if (isStart) {
    return  (
      <QuizStyled>
        <QuizTitle>Пройдите тест: "{title}"</QuizTitle>
        <QuizButton onClick={startQuiz}>Начать</QuizButton>
      </QuizStyled>);
  }

  if (isFinish) {
    return  (
      <QuizStyled>
        <QuizTitle>Результаты теста: "{title}"</QuizTitle>
        <QuizTitle>Счет: {totalStoreRef.current}</QuizTitle>
        <QuizButton onClick={startQuiz}>Попробовать заново</QuizButton>
      </QuizStyled>);
  }

  return (
    <QuizStyled>
      <QuizContext.Provider
        value={{...currentQuestion, userAnswers, setInputValue, inputValue, options: shuffleOptionsRef.current}}>
        <QuizStep questionsCount={questions.length}>
          <QuizAnswers onAnswerClick={answer => toggleAnswers(answer)} isShowMistake={isShowMistake}/>
        </QuizStep>
      </QuizContext.Provider>
      <QuizButton onClick={isShowMistake ? nextAnswer : checkAnswer}>
        {isShowMistake ? 'Продолжить' : 'Проверить'}
      </QuizButton>
    </QuizStyled>
  );
};

export default Quiz;