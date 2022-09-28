import React, { createContext } from 'react';

interface IInputContext {
  placeholder: string;
  value: string;
  setValue: (e: React.FormEvent<HTMLInputElement> | string) => void
}

export const InputContext = createContext<IInputContext>({
  placeholder: '',
  value: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {}
});