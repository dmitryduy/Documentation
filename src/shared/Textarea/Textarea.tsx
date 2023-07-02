import React from 'react';

import {TextareaStyled} from './Textarea.styles';

interface ITextareaProps {
    placeholder: string;
    height: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<ITextareaProps> = ({placeholder, onChange, value, height}) => {
  return (
    <TextareaStyled style={{height}} placeholder={placeholder} value={value} onChange={onChange}/>
  );
};

export default Textarea;