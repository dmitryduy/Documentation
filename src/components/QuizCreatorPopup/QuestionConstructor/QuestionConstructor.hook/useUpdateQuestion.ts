import { useState } from 'react';

import { IQuizQuestion, QuestionType } from '../../../../global.typings';
import { quizChecker } from '../../../../utils/checkQuiz';
import { conditionalExecution } from '../../../../utils/conditionalExecution';
import { showTooltip } from '../../../../utils/showTooltip';
import { IQuestionLocalState, updateQuestionLocalStateFunction } from '../../QuizCreatorPopup.typings';


export const useUpdateQuestion = (question: IQuizQuestion) => {
  const [questionState, setQuestionState] = useState<IQuestionLocalState>({...question, optionValue: ''});

  const updateQuestionState: updateQuestionLocalStateFunction = (key, checkedValue, afterUpdate) => {
    conditionalExecution(!!checkedValue.error,
      () => showTooltip(checkedValue.error),
      () => {
        setQuestionState(prev => ({...prev, [key]: checkedValue.value}));
        afterUpdate && afterUpdate();
      });
  };


  const updateText = (text: string) => {
    const checkedText = quizChecker.checkText(text, question.position);
    updateQuestionState('text', checkedText);
  };

  const addOption = () => {
    const checkedOption =
      quizChecker.checkOption({value: questionState.optionValue, isCorrect: false}, question.position);

    if (checkedOption.error) {
      return showTooltip(checkedOption.error);
    }

    const checkedOptions = quizChecker.checkOptionsWithoutType(
      [...questionState.options, checkedOption.value], question.position
    );

    updateQuestionState('options', checkedOptions, () => setQuestionState(prev => ({...prev, optionValue: ''})));
  };

  const updateType = (type: IQuizQuestion['type']) => {
    if (type === QuestionType.TEXT) {
      setQuestionState({...questionState, options: [], type});
    } else {
      setQuestionState({
        ...questionState,
        type,
        textCorrectAnswer: '',
        options: [...questionState.options.map(option => ({...option, isCorrect: false}))]
      });
    }
  };

  const updateCode = (code: string) => {
    const checkedCode = quizChecker.checkCode(code, question.position);
    updateQuestionState('code', checkedCode);
  };

  const updateCodeLanguage = (language: string) => {
    const checkedLanguage = quizChecker.checkCodeLanguage(language, question.position);
    updateQuestionState('codeLanguage', checkedLanguage);
  };

  const updateTextCorrectAnswer = (text: string) => {
    const checkedText = quizChecker.checkTextCorrectAnswer(text, question.position);
    updateQuestionState('textCorrectAnswer', checkedText);
  };

  const updateOptionValue = (text: string) => {
    setQuestionState({...questionState, optionValue: text});
  };

  const setCorrectOption = (text: string) => {
    if (questionState.type === QuestionType.SINGLE_SELECT) {
      setQuestionState({...questionState, options: [...questionState.options.map(option =>
        (option.value === text ? {...option, isCorrect: true} : {...option, isCorrect: false}))]});
    }
    if (questionState.type === QuestionType.MULTI_SELECT) {
      setQuestionState({...questionState, options: [...questionState.options.map(option =>
        (option.value === text ? {...option, isCorrect: !option.isCorrect} : option))] });
    }
  };

  const deleteOption = (value: string) => {
    setQuestionState({...questionState, options: [...questionState.options.filter(option => option.value !== value)]});
  };

  return {
    methods: {
      addOption,
      updateType,
      updateCode,
      updateCodeLanguage,
      updateText,
      updateTextCorrectAnswer,
      updateOptionValue,
      deleteOption,
      setCorrectOption
    },
    questionState
  };
};
