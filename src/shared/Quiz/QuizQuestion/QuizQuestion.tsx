import React from 'react';

import { IQuizQuestion } from '../../../global.typings';
import Checkbox from '../../Checkbox/Checkbox';

interface IQuizQuestionProps {
  type: IQuizQuestion['type'];
  isShowMistake: boolean;
  isActive: boolean;
  isCorrect: boolean;
  text: string;
  onClick: () => void;
}

const QuizOption: React.FC<IQuizQuestionProps> = ({type, isShowMistake, isCorrect, text, isActive, onClick}) => {
  let flags: {
    isActive: boolean;
    isDisabled: boolean;
    isError: boolean;
  } = {isActive, isDisabled: isShowMistake, isError: false};
  if (isShowMistake && isActive && !isCorrect) {
    flags = {...flags, isError: true};
  }

  if (isShowMistake && !isActive && isCorrect) {
    flags = {...flags, isActive: true};
  }

  return (
    <Checkbox value={text} {...flags} type={type} onClick={isShowMistake ? () => void 0 : onClick}/>
  );
};

export default QuizOption;