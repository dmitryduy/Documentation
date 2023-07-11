import React, { useContext } from 'react';
import { capitalize } from '@utils/capitalize';
import Input from '@shared/Input/Input';
import Checkbox, { CheckboxState } from '@shared/Checkbox/Checkbox';
import Code from '@shared/Code/Code';

import { QuizSubtitle, QuizTitle } from '../Quiz.styles';
import { QuizContext } from '../QuizContext';

import { AnswersContainer } from './QuizStep.styles';

import { IQuizQuestion, QuestionType } from '@/global.typings';

interface IQuizStepProps {
  questionsCount: number;
  onAnswerClick: (answer: string) => void;
  isShowMistake: boolean;
}

const QuizStep: React.FC<IQuizStepProps> = ({onAnswerClick, isShowMistake, questionsCount}) => {
  const {
    text,
    codeLanguage,
    code,
    position,
    type,
    inputValue,
    setInputValue,
    options,
    userAnswers
  } = useContext(QuizContext);

  const getCheckboxState = (option: IQuizQuestion['options'][0]): CheckboxState => {
    if (isShowMistake) {
      if (option.isCorrect) {
        return CheckboxState.CORRECT;
      }
      if (userAnswers.includes(option.value)) {
        return CheckboxState.INCORRECT;
      }
      return CheckboxState.NOT_SELECTED;
    } else {
      if (userAnswers.includes(option.value)) {
        return CheckboxState.SELECTED;
      }

      return CheckboxState.NOT_SELECTED;
    }
  };

  return (
    <>
      <QuizSubtitle>Вопрос {position}/{questionsCount}</QuizSubtitle>
      <QuizTitle>{capitalize(text)}</QuizTitle>
      {code && <Code code={code} language={codeLanguage} canCopy={false}/>}
      <AnswersContainer>
        {type === QuestionType.TEXT ?
          <Input value={inputValue} setValue={setInputValue} placeholder="Ответ" type="text"/> :
          options.map(option =>
            <Checkbox
              key={option.value}
              type={type === QuestionType.SINGLE_SELECT ? 'radio' : 'checkbox'}
              value={option.value}
              state={getCheckboxState(option)}
              isDisabled={isShowMistake}
              onClick={() => onAnswerClick(option.value)}
            />)}
      </AnswersContainer>
    </>
  );
};

export default QuizStep;