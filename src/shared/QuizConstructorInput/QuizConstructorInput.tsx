import React from 'react';

import { useInput } from '../../hooks/useInput';
import Input from '../Input/Input';

import { QuizConstructorInputStyled } from './QuizConstructorInput.styles';

interface IQuizConstructorInputProps {
  label: string;
  type: 'input' | 'textarea';
  text: string;
  setText: ReturnType<typeof useInput>[1];
  placeholder: string;
}

const QuizConstructorInput: React.FC<IQuizConstructorInputProps> = ({label, type, text, setText, placeholder}) => {
  return (
    <QuizConstructorInputStyled>
      <label>
        <p>{label}</p>
        {type === 'input' ? <Input type="text" value={text} setValue={setText} placeholder={placeholder}/> :
          <textarea value={text} onChange={e => setText(e.target.value)}/>}
      </label>
    </QuizConstructorInputStyled>
  );
};

export default QuizConstructorInput;