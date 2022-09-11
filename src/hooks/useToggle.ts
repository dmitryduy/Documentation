import { useState } from 'react';

export const useToggle = (initial: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initial);

  return [value, () => setValue(prev => !prev)];
};
