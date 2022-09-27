import React, { useState } from 'react';

export const useInput = (defaultValue = '', maxSize = 9999999):
  [string,
  (e: string | React.ChangeEvent<HTMLInputElement>) => void,
  () => void] => {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (e: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e === 'string') {
      setValue(e.slice(0, maxSize));
      return;
    }
    setValue(e.target.value.slice(0, maxSize));
  };

  return [value, updateValue, () => setValue('')];
};
