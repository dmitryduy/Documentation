import { IQuizQuestion } from '../global.typings';

const splitString = (str: string, separator: string) =>
  str.split(separator).map(item => item.trim()).filter(item => item.length);


/*:::tip
quiz[заголовок]
-textm- как у тебя дела
-correct- хорошо
-correct- плохо
-incorrect- отлично
-texts- сколько 5 + 5
-correct- 10
-incorrect- 20
-textt- сколько 5 + 5
-correct- 10
:::*/
const extractStringsByPrefix = (str: string, prefix: string, except = ['\n']) => {
  const strings: string[] = [];
  for (const string of splitString(str, '\n')) {
    if (string.startsWith(prefix)) {
      let isPush = true;
      for (const ex of except) {
        if (string.startsWith(ex)) {
          isPush = false;
        }
      }
      isPush && strings.push(string.slice(prefix.length)?.trim());
    }
  }
  return strings.map(item => item.trim());
};

const getQuizQuestion = (str: string, prefix: string, type: IQuizQuestion['type']): IQuizQuestion => {
  const question = extractStringsByPrefix(str, prefix)[0];
  const language = question.match(/^\[lang=([a-zA-Z]+)\]/);
  console.log(language);

  const correctAnswers = extractStringsByPrefix(str, '-correct-');
  const options = extractStringsByPrefix(str, '-incorrect-').concat(correctAnswers);
  const code = extractStringsByPrefix(str, '', ['-correct-', '-incorrect-', 't-', 'm-', 's-']);
  return {
    question: question.replace(/^\[lang=([a-zA-Z]+)\]/, ''),
    options: options.map(option => ({value: option, isCorrect: correctAnswers.includes(option)})),
    type, id: Date.now(),
    code: code?.join('\n').trim(),
    codeLanguage: language && language[1],
    position: 0,
  };
};

export const stringToQuizObject = (str: string): IQuizQuestion[] => {
  const questions: IQuizQuestion[] = [];
  const rowQuestions = splitString(str, '-text');

  for (const rowQuestion of rowQuestions) {
    switch (rowQuestion.slice(0, 2)) {
    case 't-':
      questions.push(getQuizQuestion(rowQuestion, 't-', 'text'));
      break;
    case 'm-':
      questions.push(getQuizQuestion(rowQuestion, 'm-', 'multiselect'));
      break;
    case 's-':
      questions.push(getQuizQuestion(rowQuestion, 's-', 'single'));
      break;
    }
  }
  return questions;
};