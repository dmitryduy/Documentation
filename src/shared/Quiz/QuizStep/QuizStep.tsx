import React, { PropsWithChildren, useContext } from 'react';

import { capitalize } from '../../../utils/capitalize';
import Code from '../../Code/Code';
import { QuizSubtitle, QuizTitle } from '../Quiz.styles';
import { QuizContext } from '../QuizContext';

import { Answers } from './QuizStep.styles';

interface IQuizStepProps {
  questionsCount: number;
}

const QuizStep: React.FC<PropsWithChildren<IQuizStepProps>> = ({children, questionsCount}) => {
  const {question, codeLanguage, code, position} = useContext(QuizContext);

  return (
    <>
      <QuizSubtitle>Вопрос {position}/{questionsCount}</QuizSubtitle>
      <QuizTitle>{capitalize(question)}</QuizTitle>
      {code && <Code code={code} language={codeLanguage} canCopy={false}/>}
      <Answers>{children}</Answers>
    </>
  );
};

export default QuizStep;