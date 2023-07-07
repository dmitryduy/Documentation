import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { IQuizQuestion, QuestionType } from '../../../global.typings';
import { getInputValue } from '../../../hooks/useInput';
import Select from '../../../shared/Select/Select';
import Input from '../../../shared/Input/Input';
import Checkbox, { CheckboxState } from '../../../shared/Checkbox/Checkbox';
import Switcher from '../../../shared/Switcher/Switcher';
import { useHeightAnimate } from '../../../hooks/useHeightAnimate';
import { capitalize } from '../../../utils/capitalize';
import Textarea from '../../../shared/Textarea/Textarea';
import { useStores } from '../../../hooks/useStores';

import { useUpdateQuestion } from './QuestionConstructor.hook/useUpdateQuestion';
import {
  ConstructorButton, AddVariant, CodeConstructor, Options, QuestionConstructorStyled, Variants, Title
} from './QuestionConstructor.styles';

interface IQuestionConstructorProps {
  question: IQuizQuestion;
  isActive: boolean;
}

const QuestionConstructor: React.FC<IQuestionConstructorProps> = observer(({question, isActive}) => {
  const {quizStore} = useStores();
  const [isCode, setIsCode] = useState(!!question.code);
  const {methods, optionValue, setOptionValue} = useUpdateQuestion(question);
  const contentRef = useHeightAnimate<HTMLDivElement>(isActive, {deps: [question.options, question.type, isCode]});

  const questionTextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      questionTextInputRef.current && questionTextInputRef.current.focus();
    }
  }, [isActive]);

  return (
    <QuestionConstructorStyled style={{overflow: isActive ? 'auto' : 'hidden'}}>
      <Title className={cn({active: isActive})}
        onClick={() => quizStore.changeActiveQuestion(question.id)}
        onDoubleClick={() => quizStore.deleteQuestion(question.id)}>
        <p>{capitalize(question.text)}</p>
      </Title>
      <div ref={contentRef} style={{transition: '.3s'}}>
        <Input
          ref={questionTextInputRef}
          type="text"
          label="Вопрос"
          value={question.text}
          setValue={e => methods.updateText(getInputValue(e))}
          placeholder="Введите вопрос"
        />
        <Select
          title="Тип вопроса"
          onSelect={type => methods.updateType(type as IQuizQuestion['type'])}
          defaultValue={question.type}
          options={['text', 'multiselect', 'single']}
        />
        {question.type === QuestionType.TEXT ?
          <Input
            value={question.textCorrectAnswer}
            setValue={e => methods.updateTextCorrectAnswer(getInputValue(e))}
            placeholder="Ответ на вопрос" type="text"/> :
          <Variants>
            <Options>
              <h3>
                {question.options.length ?
                  'Выделите правильные варианты. ' +
                  'Чтобы удалить вариант ответа, нажмите на него 2 раза' :
                  'Добавьте варианты ответов'}
              </h3>
              {question.options.map(option =>
                <Checkbox
                  type={question.type === QuestionType.SINGLE_SELECT ? 'radio' : 'checkbox'}
                  value={option.value}
                  state={option.isCorrect ? CheckboxState.SELECTED : CheckboxState.NOT_SELECTED}
                  isDisabled={false}
                  key={option.value}
                  onClick={() => methods.setCorrectOption(option.value)}
                  onDoubleClick={() => methods.deleteOption(option.value)}
                />)}
            </Options>
            <AddVariant>
              {question.options.length !== 0 && <p>Добавление вариант ответа</p>}
              <Input value={optionValue} onEnter={methods.addOption}
                setValue={setOptionValue} placeholder="Вариант"
                type="text"/>
              <ConstructorButton onClick={methods.addOption}>Добавить вариант ответа</ConstructorButton>
            </AddVariant>
          </Variants>}
        <CodeConstructor>
          <p>Записать код в вопрос?</p>
          <Switcher isActive={isCode} toggle={() => setIsCode(prev => !prev)}/>
          {isCode && <Input
            value={question.codeLanguage}
            setValue={e => methods.updateCodeLanguage(getInputValue(e))}
            placeholder="Язык кода" type="text"/>}
          {isCode &&
          <Textarea
            height={100}
            placeholder="Код"
            value={question.code}
            onChange={e => methods.updateCode(e.target.value)}
          />}
        </CodeConstructor>
      </div>
    </QuestionConstructorStyled>
  );
});

export default QuestionConstructor;