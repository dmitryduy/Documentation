import React, { useState } from 'react';
import cn from 'classnames';

import { capitalize } from '../../utils/capitalize';

import {SelectStyled, Title, Options} from './Select.styles';

interface ISelectProps {
    options: string[];
    onSelect: (option: string) => void;
    title: string;
}

const Select: React.FC<ISelectProps> = ({options, onSelect, title}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectOption = (option: string) => {
    if (option === selectedOption) {
      return;
    }
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <SelectStyled>
      <Title>{title}</Title>
      <Options>
        {options.map(option =>
          <li
            key={option}
            className={cn({active: option === selectedOption})}
            onClick={() => handleSelectOption(option)}>{capitalize(option)}
          </li>
        )}
      </Options>
    </SelectStyled>
  );
};

export default Select;