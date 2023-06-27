import React, { useContext } from 'react';

import Input from '../../Input/Input';
import { capitalize } from '../../../utils/capitalize';
import { QuizContext } from '../QuizContext';
import QuizOption from '../QuizQuestion/QuizQuestion';

import {QuizAnswersStyled} from './QuizAnswers.styles';

interface IQuizAnswersProps {
  onAnswerClick: (answer: string) => void;
  isShowMistake: boolean;
}

const QuizAnswers: React.FC<IQuizAnswersProps> = ({onAnswerClick, isShowMistake}) => {
  const {inputValue, setInputValue, type, options, userAnswers} = useContext(QuizContext);
  return (
    <QuizAnswersStyled>
      {type === 'text' ?
        <Input value={inputValue} setValue={setInputValue} placeholder="Ответ" type="text"/> :
        options.map(option =>
          <QuizOption
            type={type}
            text={capitalize(option.value)}
            isCorrect={option.isCorrect}
            isShowMistake={isShowMistake}
            isActive={userAnswers.includes(option.value)}
            key={option.value}
            onClick={() => onAnswerClick(option.value)}
          />)}
    </QuizAnswersStyled>
  );
};

export default QuizAnswers;