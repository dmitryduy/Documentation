import { IQuizQuestion, QuestionType } from '../../../../global.typings';
import { quizChecker } from '../../../../utils/checkQuiz';
import { showTooltip } from '../../../../utils/showTooltip';
import { useInput } from '../../../../hooks/useInput';
import { useStores } from '../../../../hooks/useStores';
import { conditionalExecution } from '../../../../utils/conditionalExecution';


export const useUpdateQuestion = (question: IQuizQuestion) => {
  const [optionValue, setOptionValue] = useInput('');
  const {quizStore} = useStores();

  const updateText = (text: string) => {
    const checkedText = quizChecker.checkText(text, question.position);
    quizStore.updateQuestion(question.id, 'text', checkedText);
  };

  const addOption = () => {
    const checkedOption = quizChecker.checkOption({value: optionValue, isCorrect: false}, question.position);

    conditionalExecution(!!checkedOption.error,
      () => showTooltip(checkedOption.error),
      () => {
        const checkedOptions = quizChecker.checkOptionsWithoutType(
          [...question.options, checkedOption.value], question.position
        );
        quizStore.updateQuestion(question.id, 'options', checkedOptions, () => setOptionValue(''));
      });
  };

  const updateType = (type: IQuizQuestion['type']) => {
    if (type === QuestionType.TEXT) {
      quizStore.updateQuestionWithoutCheck(question.id, 'options', []);
      quizStore.updateQuestionWithoutCheck(question.id, 'type', type);
    } else {
      quizStore.updateQuestionWithoutCheck(question.id, 'textCorrectAnswer', '');
      quizStore.updateQuestionWithoutCheck(question.id, 'type', type);
      quizStore.updateQuestionWithoutCheck(
        question.id,
        'options',
        question.options.map(option => ({...option, isCorrect: false})));
    }
  };

  const updateCode = (code: string) => {
    const checkedCode = quizChecker.checkCode(code, question.position);
    quizStore.updateQuestion(question.id, 'code', checkedCode);
  };

  const updateCodeLanguage = (language: string) => {
    const checkedLanguage = quizChecker.checkCodeLanguage(language, question.position);
    quizStore.updateQuestion(question.id, 'codeLanguage', checkedLanguage);
  };

  const updateTextCorrectAnswer = (text: string) => {
    const checkedText = quizChecker.checkTextCorrectAnswer(text, question.position);
    quizStore.updateQuestion(question.id, 'textCorrectAnswer', checkedText);
  };

  const setCorrectOption = (text: string) => {
    if (question.type === QuestionType.SINGLE_SELECT) {
      quizStore.updateQuestionWithoutCheck(
        question.id,
        'options',
        question.options.map(option => ({...option, isCorrect: option.value === text})));
    }
    if (question.type === QuestionType.MULTI_SELECT) {
      quizStore.updateQuestionWithoutCheck(
        question.id,
        'options',
        question.options.map(option => (option.value === text ? {...option, isCorrect: !option.isCorrect} : option)));
    }
  };

  const deleteOption = (value: string) => {
    quizStore.updateQuestionWithoutCheck(
      question.id,
      'options',
      [...question.options.filter(option => option.value !== value)]);
  };

  return {
    methods: {
      addOption,
      updateType,
      updateCode,
      updateCodeLanguage,
      updateText,
      updateTextCorrectAnswer,
      deleteOption,
      setCorrectOption
    },
    optionValue,
    setOptionValue
  };
};
