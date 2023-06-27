import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { IQuizQuestion } from '../../../global.typings';
import QuizConstructorInput from '../../../shared/QuizConstructorInput/QuizConstructorInput';
import { useInput } from '../../../hooks/useInput';
import Select from '../../../shared/Select/Select';
import Input from '../../../shared/Input/Input';
import { capitalize } from '../../../utils/capitalize';
import Checkbox from '../../../shared/Checkbox/Checkbox';
import { showTooltip } from '../../../utils/showTooltip';
import { QuizContext } from '../../../shared/Quiz/QuizContext';
import Switcher from '../../../shared/Switcher/Switcher';
import { useHeightAnimate } from '../../../hooks/useHeightAnimate';

import {
  QuestionConstructorStyled,
  Title,
  AddButton,
  AddVariant,
  Variants,
  Options,
  CodeConstructor,
  TextArea
} from './QuestionConstructor.styles';

interface IQuestionConstructorProps {
  isActive: boolean;
  question: IQuizQuestion;
  toggleIsActive: () => void;
  deleteQuestion: () => void;
  update: <K extends keyof IQuizQuestion>(key: K, value: IQuizQuestion[K]) => void;
}

const QuestionConstructor: React.FC<IQuestionConstructorProps> = ({
  deleteQuestion, toggleIsActive, isActive, question, update
}) => {
  const [title, setTitle] = useInput(question.question, 100);
  const [codeLanguage, setCodeLanguage] = useInput(question.codeLanguage || '', 5);
  const [optionValue, setOptionValue] = useInput('');
  const {setInputValue, inputValue} = useContext(QuizContext);
  const [isCode, setIsCode] = useState(false);
  const contentRef = useHeightAnimate<HTMLDivElement>(isActive, {deps: [question, isCode]});

  useEffect(() => {
    if (title.length > 100) {
      showTooltip('Название вопроса не может быть таким большим');
      return;
    }
    update('question', title.trim());
  }, [title]);

  useEffect(() => {
    if (codeLanguage.trim().length > 10) {
      showTooltip('Название языка не может быть таким большим');
      return;
    }
    if (codeLanguage.trim()) {
      update('codeLanguage', codeLanguage.trim());
    }
  }, [codeLanguage]);

  const addOption = () => {
    const trimmedOption = optionValue.trim();
    if (question.options.length >= 10) {
      showTooltip('Превышен лимит вариантов ответов на вопрос');
      return;
    }

    if (question.options.map(option => option.value).includes(trimmedOption)) {
      showTooltip('Нельзя воздавать одинаковые варианты ответов');
      return;
    }
    if (trimmedOption) {
      update('options', [...question.options, {value: trimmedOption, isCorrect: false}]);
    }

    setOptionValue('');
  };

  const setCorrectOption = (text: string) => {
    if (question.type === 'single') {
      update('options', [...question.options.map(option =>
        (option.value === text ? {...option, isCorrect: true} : {...option, isCorrect: false}))]);
    } else if (question.type === 'multiselect') {
      update('options', [...question.options.map(option =>
        (option.value === text ? {...option, isCorrect: true} : option))]);
    }
  };

  const deleteOption = (value: string) => {
    update('options', [...question.options.filter(option => option.value !== value)]);
  };

  const updateType = (type: IQuizQuestion['type']) => {
    update('type', type as IQuizQuestion['type']);
    update('options', [...question.options.map(option => ({...option, isCorrect: false}))]);
  };

  return (
    <QuestionConstructorStyled style={{overflow: isActive ? 'auto' : 'hidden'}}>
      <Title className={cn({active: isActive})} onClick={toggleIsActive} onDoubleClick={deleteQuestion}>
        <p>{question.question}</p>
      </Title>
      <div ref={contentRef} style={{transition: '.3s'}}>
        <QuizConstructorInput label="Вопрос" type="input" text={title} setText={setTitle} placeholder="Введите вопрос"/>
        <Select
          title="Тип вопроса"
          onSelect={type => updateType(type as IQuizQuestion['type'])}
          options={['text', 'multiselect', 'single']}
        />
        {question.type === 'text' ?
          <Input value={inputValue} setValue={setInputValue} placeholder="Ответ на вопрос" type="text"/> :
          <Variants>
            <Options>
              <h3>
                {question.options.length ?
                  'Нажмите на вариант, чтобы сделать его правильным. ' +
                  'Чтобы удалить вариант ответа, нажмите на него 2 раза' :
                  'Добавьте варианты ответов'}
              </h3>
              {question.options.map(option =>
                <Checkbox
                  type={question.type}
                  value={capitalize(option.value)}
                  isDisabled={false}
                  isError={false}
                  isActive={option.isCorrect}
                  key={option.value}
                  onClick={() => setCorrectOption(option.value)}
                  onDelete={() => deleteOption(option.value)}
                />)}
            </Options>
            <AddVariant>
              {question.options.length !== 0 && <p>Добавление вариант ответа</p>}
              <Input value={optionValue} setValue={setOptionValue} placeholder="Вариант" type="text"/>
              <AddButton onClick={addOption}>Добавить вариант ответа</AddButton>
            </AddVariant>
          </Variants>}
        <CodeConstructor>
          <p>Записать код в вопрос?</p>
          <Switcher isActive={isCode} toggle={() => setIsCode(prev => !prev)}/>
          {isCode && <Input
            value={codeLanguage}
            setValue={setCodeLanguage}
            placeholder="Язык кода" type="text"/>}
          {isCode && <TextArea placeholder="Код" value={question.code} onChange={e => update('code', e.target.value)}/>}
        </CodeConstructor>
      </div>
    </QuestionConstructorStyled>
  );
};

export default QuestionConstructor;