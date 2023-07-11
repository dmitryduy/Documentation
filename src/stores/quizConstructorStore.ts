import { makeAutoObservable } from 'mobx';
import { getTemplateQuestion } from '@components/QuizCreatorPopup/QuizCreatorPopup.utils';
import { conditionalExecution } from '@utils/conditionalExecution';
import { checkerFunction } from '@utils/checkQuiz';
import { showToast } from '@utils/showToast';

import { IQuizQuestion } from '@/global.typings';

class QuizConstructorStore {
  activeQuestionId: IQuizQuestion['id'] = 0;
  questions: IQuizQuestion[] = [];

  constructor() {
    makeAutoObservable(this);
    this.resetQuestions();
  }

  get activeQuestion(): IQuizQuestion {
    return this.questions.find(question => question.id === this.activeQuestionId) || {} as IQuizQuestion;
  }

  updatePositions() {
    this.questions.forEach((question, idx) => {
      question.position = idx + 1;
    });
  }

  changeActiveQuestion(id: IQuizQuestion['id']) {
    this.activeQuestionId = id;
  }

  createQuestion() {
    const newQuestion = getTemplateQuestion();
    this.questions.push(newQuestion);
    this.activeQuestionId = newQuestion.id;
    this.updatePositions();
  }

  deleteQuestion(questionId: IQuizQuestion['id']) {
    conditionalExecution(this.questions.length <= 1,
      () => showToast('Должет быть хотя бы 1 вопрос'),
      () => {
        const deletingIndex = this.questions.findIndex(question => question.id === questionId);
        this.questions.splice(deletingIndex, 1);
        this.activeQuestionId = this.questions[0].id;
        this.updatePositions();
      });
  }

  resetQuestions() {
    const initQuestion = getTemplateQuestion();
    this.questions = [initQuestion];
    this.activeQuestionId = initQuestion.id;
  }

  setQuestions(questions: IQuizQuestion[]) {
    this.questions = questions;
  }

  updateQuestion<K extends keyof IQuizQuestion>(
    questionId: IQuizQuestion['id'],
    key: K,
    checkedValue: ReturnType<checkerFunction<IQuizQuestion[K]>>,
    afterUpdate?: () => void
  ) {
    const updatingQuestion = this.questions.find(question => question.id === questionId);
    if (!updatingQuestion) return;

    conditionalExecution(!!checkedValue.error,
      () => showToast(checkedValue.error),
      () => {
        updatingQuestion[key] = checkedValue.value;
        afterUpdate && afterUpdate();
      });
  }
  updateQuestionWithoutCheck<K extends keyof IQuizQuestion>(
    questionId: IQuizQuestion['id'],
    key: K,
    value: IQuizQuestion[K]
  ) {
    const updatingQuestion = this.questions.find(question => question.id === questionId);

    if (!updatingQuestion) return;
    updatingQuestion[key] = value;
  }
}

export default new QuizConstructorStore();