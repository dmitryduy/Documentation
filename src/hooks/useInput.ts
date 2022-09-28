import React, { useState } from 'react';

export const useInput = (defaultValue = '', maxSize = 9999999):
  [string,
  (e: string | React.FormEvent<HTMLInputElement>) => void,
  () => void] => {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (e: string | React.FormEvent<HTMLInputElement>) => {
    if (typeof e === 'string') {
      setValue(e.slice(0, maxSize));
      return;
    }
    setValue((e.target as HTMLInputElement).value.slice(0, maxSize));
  };

  return [value, updateValue, () => setValue('')];
};
