import { removeDuplicate } from './removeDuplicate';

import { IQuizQuestion } from '@/global.typings';


type beautifierMethod<T> = (value: T) => T;

interface IQuestionBeautifier {
  beautifyText: beautifierMethod<IQuizQuestion['text']>;
  beautifyOptions: beautifierMethod<IQuizQuestion['options']>;
  beautifyOption: beautifierMethod<IQuizQuestion['options'][0]>;
  beautifyCodeLanguage: beautifierMethod<IQuizQuestion['codeLanguage']>;
  beautifyCode: beautifierMethod<IQuizQuestion['code']>;
  beautifyTextCorrectAnswer: beautifierMethod<IQuizQuestion['textCorrectAnswer']>;
  beautifyQuestion: beautifierMethod<IQuizQuestion>;
  beautifyQuiz: beautifierMethod<IQuizQuestion[]>;
}

export const questionBeautifier: IQuestionBeautifier = {
  beautifyText(text) {
    return text?.trim();
  },
  beautifyOption(option) {
    return {...option, value: option.value.trim()};
  },
  beautifyOptions(options) {
    return removeDuplicate(options).map(option => this.beautifyOption(option));
  },
  beautifyCodeLanguage(language) {
    return language?.trim();
  },
  beautifyCode(code) {
    return code;
  },
  beautifyTextCorrectAnswer(answer) {
    return answer?.trim();
  },
  beautifyQuestion(question) {
    return {
      options: this.beautifyOptions(question.options),
      type: question.type,
      code: this.beautifyCode(question.code),
      codeLanguage: this.beautifyCodeLanguage(question.codeLanguage),
      text: this.beautifyText(question.text),
      id: question.id,
      isShuffleOptions: question.isShuffleOptions,
      textCorrectAnswer: this.beautifyTextCorrectAnswer(question.textCorrectAnswer),
      position: question.position
    };
  },
  beautifyQuiz(questions) {
    return questions.map<IQuizQuestion>(question => this.beautifyQuestion(question));
  }
};