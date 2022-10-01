import { useState } from 'react';

type PasswordType = 'password' | 'text';

export const usePasswordType = (): [PasswordType, (value?: PasswordType) => void] => {
  const [type, setType] = useState<PasswordType>('password');

  const changeType = (value?: PasswordType) => {
    if (value) {
      setType(value);
      return;
    }
    setType(type === 'password' ?  'text' : 'password');
  };

  return [type, changeType];
};
