import { IQuizQuestion, QuestionType } from '../global.typings';

import { removeDuplicate } from './removeDuplicate';
import { questionBeautifier } from './beautifyQuestions';

export const MAX_QUESTION_TEXT_LENGTH = 100;
export const MAX_QUIZ_QUESTIONS = 50;
export const MAX_CODE_LANGUAGE_LENGTH = 10;
export const MAX_OPTIONS_COUNT = 10;
export const MAX_CODE_LENGTH = 400;
export const MAX_OPTION_LENGTH = 200;
export const MAX_TEXT_CORRECT_ANSWER_LENGTH = 100;

export type checkerFunction<T, E = undefined> = E extends undefined
  ? (value: T, position: number) => { error: string; value: T }
  : (value: T, position: number, extra: E) => { error: string; value: T };

const getCheckFunctionResult = <T>(value: T) => (error?: string): ReturnType<checkerFunction<T>> => {
  return {error: error || '', value};
};

interface IChecker {
  checkText: checkerFunction<IQuizQuestion['text']>;
  checkOptions: checkerFunction<IQuizQuestion['options'], IQuizQuestion['type']>;
  checkOptionsWithoutType: checkerFunction<IQuizQuestion['options']>;
  checkOption: checkerFunction<IQuizQuestion['options'][0]>;
  checkCodeLanguage: checkerFunction<IQuizQuestion['codeLanguage']>;
  checkCode: checkerFunction<IQuizQuestion['code']>;
  checkTextCorrectAnswer: checkerFunction<IQuizQuestion['textCorrectAnswer']>;
  checkQuestion: checkerFunction<IQuizQuestion>;
  checkQuiz: checkerFunction<IQuizQuestion[]>;
}

export const quizChecker: IChecker = {
  checkText(text, position) {
    const getError = getCheckFunctionResult(text);
    if (text.length > MAX_QUESTION_TEXT_LENGTH) {
      return getError(`Длина вопроса ${position} не должна быть больше ${MAX_QUESTION_TEXT_LENGTH}`);
    }

    return getError();
  },
  checkOptionsWithoutType(options, position) {
    const getError = getCheckFunctionResult(options);

    if (options.length >= MAX_OPTIONS_COUNT + 1) {
      return getError(`Превышен лимит вариантов ответов на вопрос ${position}`);
    }

    if (removeDuplicate(options.map(option => option.value)).length !== options.length) {
      return getError(`Нельзя воздавать одинаковые варианты ответов в вопросе ${position}`);
    }

    for (const option of options) {
      const checkedOption = this.checkOption(option, position);
      if (checkedOption.error) return {error: checkedOption.error, value: options};
    }

    return getError();
  },
  checkOptions(options, position, type) {
    const getError = getCheckFunctionResult(options);

    const checkedOptions = this.checkOptionsWithoutType(options, position);
    if (checkedOptions.error) return checkedOptions;

    if (type === QuestionType.SINGLE_SELECT && options.filter(option => option.isCorrect)?.length !== 1) {
      return getError(`У вопросов ${position} с одиночным ответом должен быть один правильный ответ`);
    }
    if (type === QuestionType.MULTI_SELECT && options.filter(option => option.isCorrect)?.length < 1) {
      return getError(`У вопроса ${position} должен быть хотя бы один правильный ответ`);
    }

    return getError();
  },
  checkOption(option, position) {
    const getError = getCheckFunctionResult(option);

    if (option.value.length === 0) {
      return getError(`Опция в вопросе ${position} не должна быть пустая`);
    }

    if (option.value.length > MAX_OPTION_LENGTH) {
      return getError(
        `Длина опции '${option.value.slice(0, 30)}...' в вопросе ${position} не должна превышать ${MAX_OPTION_LENGTH}`);
    }

    return getError();
  },
  checkCodeLanguage(language, position) {
    const getError = getCheckFunctionResult(language);

    if (language.length > MAX_CODE_LANGUAGE_LENGTH) {
      return getError(`Название языка в вопросе ${position} не может превышать ${MAX_CODE_LANGUAGE_LENGTH} символов`);
    }

    return getError();
  },
  checkCode(code, position) {
    const getError = getCheckFunctionResult(code);

    if (code.length > MAX_CODE_LENGTH) {
      return getError(`Превышено максимальное количество символов в коде (${MAX_CODE_LENGTH}) в вопросе ${position}`);
    }

    return getError();
  },
  checkTextCorrectAnswer(answer, position) {
    const getError = getCheckFunctionResult(answer);

    if (answer.length > MAX_TEXT_CORRECT_ANSWER_LENGTH) {
      return getError(`Длина ответа в вопросе ${position} не должна превосходить ${MAX_TEXT_CORRECT_ANSWER_LENGTH}`);
    }

    return getError();
  },
  checkQuestion(question, position) {
    const getError = getCheckFunctionResult(question);
    const error = this.checkText(question.text, position).error ||
      this.checkOptions(question.options, position, question.type).error ||
      this.checkCodeLanguage(question.codeLanguage, position).error ||
      this.checkCode(question.code, position).error ||
      this.checkTextCorrectAnswer(question.textCorrectAnswer, position).error;

    if (error) return getError(error);

    if (!question.text) {
      return getError(`Вопрос ${question.position} не должен быть пустой`);
    }

    if (question.type === QuestionType.TEXT && !question.textCorrectAnswer) {
      return getError(`В вопросе ${question.position} должен быть введен правильный ответ`);
    }

    if (question.codeLanguage && !question.code || question.code && !question.codeLanguage) {
      return getError(`Вопрос ${question.position} должен иметь как язык, так и сам код`);
    }

    return getError();
  },
  checkQuiz(questions) {
    questions = questionBeautifier.beautifyQuiz(questions);
    const getError = getCheckFunctionResult(questions);

    if (!questions || questions.length === 0) {
      return getError('Нет вопросов викторины');
    }

    if (questions.length > MAX_QUIZ_QUESTIONS) {
      return getError(`Максимальное количество вопросов не должно превышать ${MAX_QUIZ_QUESTIONS}`);
    }

    for (const question of questions) {
      const text = questionBeautifier.beautifyText(question.text);

      if (text.length === 0) return getError(`У вопроса ${question.position} должен быть текст`);

      const checkedQuestion = this.checkQuestion(question, question.position);
      if (checkedQuestion.error) return getError(checkedQuestion.error);
    }

    return getError();
  }
};