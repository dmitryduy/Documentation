import React, { useState } from 'react';

export const useInput = (defaultValue = '', maxSize = Infinity):
  [string, (e: string | React.FormEvent<HTMLInputElement>) => void, () => void] => {
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

export const getInputValue = (e: Parameters<ReturnType<typeof useInput>[1]>[0]) => {
  if (typeof e === 'string') {
    return e;
  }
  return (e.target as HTMLInputElement).value;
};
