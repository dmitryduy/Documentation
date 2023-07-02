import { IQuizQuestion } from '../../global.typings';
import { checkerFunction } from '../../utils/checkQuiz';

export interface IQuestionLocalState extends IQuizQuestion {
  optionValue: string;
}

export type updateQuestionLocalStateFunction = <K extends keyof IQuestionLocalState>
(key: K, checkedValue: ReturnType<checkerFunction<IQuestionLocalState[K]>>, afterUpdate?: () => void) => void