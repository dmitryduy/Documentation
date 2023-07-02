import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { IQuizQuestion, QuestionType } from '../../../global.typings';
import { getInputValue } from '../../../hooks/useInput';
import Select from '../../../shared/Select/Select';
import Input from '../../../shared/Input/Input';
import Checkbox, { CheckboxState } from '../../../shared/Checkbox/Checkbox';
import Switcher from '../../../shared/Switcher/Switcher';
import { useHeightAnimate } from '../../../hooks/useHeightAnimate';
import { capitalize } from '../../../utils/capitalize';
import Textarea from '../../../shared/Textarea/Textarea';

import { useUpdateQuestion } from './QuestionConstructor.hook/useUpdateQuestion';
import {
  ConstructorButton, AddVariant, CodeConstructor, Options, QuestionConstructorStyled, Variants, Title
} from './QuestionConstructor.styles';

interface IQuestionConstructorProps {
  isActive: boolean;
  toggleIsActive: () => void;
  onUpdate: (updatedQuestion: IQuizQuestion | null) => void;
  question: IQuizQuestion;
}

const QuestionConstructor: React.FC<IQuestionConstructorProps> = ({toggleIsActive, isActive, onUpdate, question}) => {
  const [isCode, setIsCode] = useState(!!question.code);
  const {methods, questionState} = useUpdateQuestion(question);
  const contentRef = useHeightAnimate<HTMLDivElement>(isActive, {deps: [questionState, isCode]});

  const questionTextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const {optionValue, ...updatedQuestion} = questionState;
    onUpdate(updatedQuestion);
  }, [questionState]);

  useEffect(() => {
    if (isActive) {
      questionTextInputRef.current && questionTextInputRef.current.focus();
    }
  }, [isActive]);

  return (
    <QuestionConstructorStyled style={{overflow: isActive ? 'auto' : 'hidden'}}>
      <Title className={cn({active: isActive})} onClick={toggleIsActive} onDoubleClick={() => onUpdate(null)}>
        <p>{capitalize(questionState.text)}</p>
      </Title>
      <div ref={contentRef} style={{transition: '.3s'}}>
        <Input
          ref={questionTextInputRef}
          type="text"
          label="Вопрос"
          value={questionState.text}
          setValue={e => methods.updateText(getInputValue(e))}
          placeholder="Введите вопрос"
        />
        <Select
          title="Тип вопроса"
          onSelect={type => methods.updateType(type as IQuizQuestion['type'])}
          defaultValue={questionState.type}
          options={['text', 'multiselect', 'single']}
        />
        {questionState.type === QuestionType.TEXT ?
          <Input
            value={questionState.textCorrectAnswer}
            setValue={e => methods.updateTextCorrectAnswer(getInputValue(e))}
            placeholder="Ответ на вопрос" type="text"/> :
          <Variants>
            <Options>
              <h3>
                {questionState.options.length ?
                  'Выделите правильные варианты. ' +
                  'Чтобы удалить вариант ответа, нажмите на него 2 раза' :
                  'Добавьте варианты ответов'}
              </h3>
              {questionState.options.map(option =>
                <Checkbox
                  type={questionState.type === QuestionType.SINGLE_SELECT ? 'radio' : 'checkbox'}
                  value={option.value}
                  state={option.isCorrect ? CheckboxState.SELECTED : CheckboxState.NOT_SELECTED}
                  isDisabled={false}
                  key={option.value}
                  onClick={() => methods.setCorrectOption(option.value)}
                  onDoubleClick={() => methods.deleteOption(option.value)}
                />)}
            </Options>
            <AddVariant>
              {questionState.options.length !== 0 && <p>Добавление вариант ответа</p>}
              <Input value={questionState.optionValue} onEnter={methods.addOption}
                setValue={e => methods.updateOptionValue(getInputValue(e))} placeholder="Вариант"
                type="text"/>
              <ConstructorButton onClick={methods.addOption}>Добавить вариант ответа</ConstructorButton>
            </AddVariant>
          </Variants>}
        <CodeConstructor>
          <p>Записать код в вопрос?</p>
          <Switcher isActive={isCode} toggle={() => setIsCode(prev => !prev)}/>
          {isCode && <Input
            value={questionState.codeLanguage}
            setValue={e => methods.updateCodeLanguage(getInputValue(e))}
            placeholder="Язык кода" type="text"/>}
          {isCode &&
          <Textarea
            height={100}
            placeholder="Код"
            value={questionState.code}
            onChange={e => methods.updateCode(e.target.value)}
          />}
        </CodeConstructor>
      </div>
    </QuestionConstructorStyled>
  );
};

export default QuestionConstructor;