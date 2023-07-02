import { IQuizQuestion, QuestionType } from '../../global.typings';
import { shuffle } from '../../utils/shuffle';
import { questionBeautifier } from '../../utils/beautifyQuestions';

export const getAnswerScore = (correctAnswers: string[], answers: string[]) => {
  let score = 0;
  for (const answer of answers) {
    if (correctAnswers.includes(answer)) {
      score++;
    } else {
      score--;
    }
  }

  return Math.max(score, 0);
};

export const getMaxScore = (questions: IQuizQuestion[]) => {
  let maxScore = 0;
  for (const question of questions) {
    if (question.type === QuestionType.TEXT) {
      maxScore++;
    } else {
      maxScore += question.options.filter(option => option.isCorrect).length;
    }
  }

  return maxScore;
};

export const getInitialQuestion = (question: IQuizQuestion): IQuizQuestion & { userAnswers: string[] } => {
  const beautifyQuestion = questionBeautifier.beautifyQuiz([question])[0];
  return {
    ...beautifyQuestion,
    options: shuffle(beautifyQuestion.options),
    userAnswers: []
  };
};

export const getGradeByScore = (score: number, maxScore: number) => {
  if (score / maxScore >= 0.9) return 'Оценка 5. 😃';
  if (score / maxScore >= 0.75) return 'Оценка 4. 😄';
  if (score / maxScore >= 0.5) return 'Оценка 3. 🙂';
  return 'Оценка 2. 😕';
};
