import React from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';

import { QuizContext } from '../../shared/Quiz/QuizContext';
import QuizStep from '../../shared/Quiz/QuizStep/QuizStep';
import { QuizStyled } from '../../shared/Quiz/Quiz.styles';
import Button from '../../shared/Button/Button';
import { IQuizQuestion } from '../../global.typings';
import { getFromClipboard } from '../../utils/getFromClipboard';
import { parseQuizJSON } from '../../utils/parseQuizJSON';

import QuestionConstructor from './QuestionConstructor/QuestionConstructor';
import { Background, Buttons, PopupContent, QuizConstructor, QuizContent } from './QuizCreatorPopup.styles';
import { useQuizPopup } from './QuizCreatorPopup.hooks';

interface IQuizCreatorPopupProps {
  active: boolean;
  close: () => void;
}

const QuizCreatorPopup: React.FC<IQuizCreatorPopupProps> = ({close, active}) => {
  const {
    questions,
    activeQuestion,
    createQuestion,
    createQuiz,
    deleteQuestion,
    changeActiveQuestion,
    setQuestions
  } = useQuizPopup();

  const onUpdate = (id: IQuizQuestion['id']) => (updatedQuestion: IQuizQuestion | null) => {
    if (!updatedQuestion) {
      deleteQuestion(id);
      return;
    }
    const questionIndex = questions.findIndex(question => question.id === id);
    if (JSON.stringify(updatedQuestion) === JSON.stringify(questions[questionIndex])) {
      return;
    }
    setQuestions(prev => prev.map(question => (question.id === id ? updatedQuestion : question)));
  };

  const setQuizFromClipboard = () => {
    getFromClipboard(text => {
      const quiz = parseQuizJSON(text);
      if (quiz) {
        setQuestions(quiz);
        changeActiveQuestion(quiz[0].id);
      }
    });
  };

  return createPortal(
    <Background className={cn({active, hidden: !active})} onClick={close}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <QuizConstructor>
          <QuizContent>
            {questions.map(question =>
              <QuestionConstructor
                toggleIsActive={() => changeActiveQuestion(question.id)}
                onUpdate={onUpdate(question.id)}
                key={question.id}
                isActive={activeQuestion.id === question.id}
                question={question}
              />)}
          </QuizContent>
          <Buttons>
            <Button onClick={createQuestion} text="Создать вопрос"/>
            <Button onClick={createQuiz} text="Создать квиз"/>
            <Button onClick={setQuizFromClipboard} text="Вставить квиз"/>
            <Button onClick={close} text="Закрыть"/>
          </Buttons>
        </QuizConstructor>
        <QuizContext.Provider value={{...activeQuestion, inputValue: '', setInputValue: () => void 0, userAnswers: []}}>
          <QuizStyled>
            <QuizStep questionsCount={questions.length} onAnswerClick={() => void 0} isShowMistake/>
          </QuizStyled>
        </QuizContext.Provider>
      </PopupContent>
    </Background>,
    document.querySelector('body') as Element
  );
};

export default QuizCreatorPopup;