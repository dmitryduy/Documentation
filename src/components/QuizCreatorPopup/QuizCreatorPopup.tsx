import React from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react-lite';

import { QuizContext } from '../../shared/Quiz/QuizContext';
import QuizStep from '../../shared/Quiz/QuizStep/QuizStep';
import { QuizStyled } from '../../shared/Quiz/Quiz.styles';
import Button from '../../shared/Button/Button';
import { getFromClipboard } from '../../utils/getFromClipboard';
import { parseQuizJSON, stringifyQuizJSON } from '../../utils/parseQuizJSON';
import { quizChecker } from '../../utils/checkQuiz';
import { conditionalExecution } from '../../utils/conditionalExecution';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useStores } from '../../hooks/useStores';
import { useToast } from '../../hooks/useToast';

import { Background, Buttons, PopupContent, QuizConstructor, QuizContent } from './QuizCreatorPopup.styles';
import QuestionConstructor from './QuestionConstructor/QuestionConstructor';

interface IQuizCreatorPopupProps {
  active: boolean;
  close: () => void;
}

const QuizCreatorPopup: React.FC<IQuizCreatorPopupProps> = observer(({close, active}) => {
  const {quizStore} = useStores();
  const showToast = useToast();

  const createQuiz = () => {
    const checkedQuiz = quizChecker.checkQuiz(quizStore.questions, 0);

    conditionalExecution(!!checkedQuiz.error,
      () => showToast(checkedQuiz.error),
      () => {
        copyToClipboard(stringifyQuizJSON(checkedQuiz.value), showToast, showToast);
        quizStore.resetQuestions();
      });
  };

  const setQuizFromClipboard = () => {
    getFromClipboard(text => {
      const quiz = parseQuizJSON(text, showToast);
      if (quiz) {
        quizStore.setQuestions(quiz);
        quizStore.changeActiveQuestion(quiz[0].id);
      }
    },
    showToast);
  };

  return createPortal(
    <Background className={cn({active, hidden: !active})} onClick={close}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <QuizConstructor>
          <QuizContent>
            {quizStore.questions.map(question =>
              <QuestionConstructor
                key={question.id}
                isActive={question.id === quizStore.activeQuestionId}
                question={question}
              />)}
          </QuizContent>
          <Buttons>
            <Button onClick={() => quizStore.createQuestion()} text="Создать вопрос"/>
            <Button onClick={createQuiz} text="Создать квиз"/>
            <Button onClick={setQuizFromClipboard} text="Вставить квиз"/>
            <Button onClick={close} text="Закрыть"/>
          </Buttons>
        </QuizConstructor>
        <QuizContext.Provider
          value={{...quizStore.activeQuestion, inputValue: '', setInputValue: () => void 0, userAnswers: []}}>
          <QuizStyled>
            <QuizStep questionsCount={quizStore.questions.length} onAnswerClick={() => void 0} isShowMistake/>
          </QuizStyled>
        </QuizContext.Provider>
      </PopupContent>
    </Background>,
    document.querySelector('body') as Element
  );
});

export default QuizCreatorPopup;