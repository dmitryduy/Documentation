import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { QuizContext } from '../../shared/Quiz/QuizContext';
import QuizStep from '../../shared/Quiz/QuizStep/QuizStep';
import { IQuizQuestion } from '../../global.typings';
import { useInput } from '../../hooks/useInput';
import { QuizStyled } from '../../shared/Quiz/Quiz.styles';
import Button from '../../shared/Button/Button';
import { showTooltip } from '../../utils/showTooltip';
import { checkQuiz } from '../../utils/checkQuiz';
import Input from '../../shared/Input/Input';
import QuizOption from '../../shared/Quiz/QuizQuestion/QuizQuestion';
import { capitalize } from '../../utils/capitalize';
import { copyToClipboard } from '../../utils/copyToClipboard';

import QuestionConstructor from './QuestionConstructor/QuestionConstructor';
import { PopupContent, Background, QuizConstructor, Buttons, QuizContent } from './QuizCreatorPopup.styles';

const getTemplateQuestion = (): IQuizQuestion => (
  {
    question: 'Новый вопрос',
    options: [],
    id: Date.now() + Math.random(),
    type: 'text',
    codeLanguage: '',
    code: '',
    position: 1
  }
);

interface IQuizCreatorPopupProps {
  active: boolean;
  close: () => void;
}


const QuizCreatorPopup: React.FC<IQuizCreatorPopupProps> = ({close, active}) => {
  const [questions, setQuestions] = useState<IQuizQuestion[]>(() => [getTemplateQuestion()]);
  const [activeQuestion, setActiveQuestion] = useState(questions[0].id);
  const [inputValue, setInputValue] = useInput('');

  const currentQuestion = questions.find(question => question.id === activeQuestion) || {} as IQuizQuestion;

  const updateQuestion = (id: number) => <K extends keyof IQuizQuestion>(key: K, value: IQuizQuestion[K]) => {
    setQuestions(prev => prev.map(question => (question.id === id ? {...question, [key]: value} : question)));
  };

  useEffect(() => {
    if (inputValue.trim()) {
      updateQuestion(activeQuestion)('textCorrectAnswer', inputValue.trim());
    }
  }, [inputValue]);

  const updatePositions = () => {
    setQuestions(prev => [...prev.map((question, idx) => ({...question, position: idx + 1}))]);
  };

  const createQuestion = () => {
    if (questions.length >= 50) {
      showTooltip('Слишком много вопросов');
      return;
    }
    setQuestions(prev => {
      const newQuestion = getTemplateQuestion();
      setActiveQuestion(newQuestion.id);
      return [...prev, newQuestion];
    });
    updatePositions();
  };

  const deleteQuestion = (id: number) => {
    if (questions.length <= 1) {
      showTooltip('Должет быть хотя бы 1 вопрос');
      return;
    }
    setQuestions(prev => {
      const without = prev.filter(question => question.id !== id);
      setActiveQuestion(without[0].id);
      return without;
    });
    updatePositions();
  };

  const createQuiz = () => {
    const error = checkQuiz(questions);
    if (error) {
      showTooltip(error);
      return;
    }
    copyToClipboard(JSON.stringify(questions)
      .replaceAll('"isCorrect":true', '"isCorrect":"true"')
      .replaceAll('"isCorrect":false', '"isCorrect":"false"'));
    setQuestions(() => {
      const newQuiz = [getTemplateQuestion()];
      setActiveQuestion(newQuiz[0].id);
      return newQuiz;
    });
    setInputValue('');
    close();
  };

  return createPortal(
    <Background className={cn({active, hidden: !active})} onClick={close}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <QuizContext.Provider
          value={{...currentQuestion, inputValue, setInputValue, userAnswers: []}}>
          <QuizConstructor>
            <QuizContent>
              {questions.map(question =>
                <QuestionConstructor
                  deleteQuestion={() => deleteQuestion(question.id)}
                  toggleIsActive={() => setActiveQuestion(question.id)}
                  update={updateQuestion(question.id)}
                  key={question.id}
                  isActive={activeQuestion === question.id}
                  question={question}
                />)}
            </QuizContent>
            <Buttons>
              <Button onClick={createQuestion} text="Создать вопрос"/>
              <Button onClick={createQuiz} text="Создать квиз"/>
              <Button onClick={close} text="Закрыть конструктор"/>
            </Buttons>
          </QuizConstructor>
          <QuizStyled>
            <QuizStep questionsCount={questions.length}>
              {currentQuestion.type === 'text' ?
                <Input value="" setValue={() => void 0} placeholder="Ответ" type="text"/> :
                currentQuestion.options.map(option =>
                  <QuizOption
                    type={currentQuestion.type}
                    text={capitalize(option.value)}
                    isCorrect={false}
                    isShowMistake={false}
                    isActive={false}
                    key={option.value}
                    onClick={() => void 0}
                  />)}
            </QuizStep>
          </QuizStyled>
        </QuizContext.Provider>
      </PopupContent>
    </Background>,
    document.querySelector('body') as Element
  );
};

export default QuizCreatorPopup;