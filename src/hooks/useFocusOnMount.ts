import { useEffect, useRef } from 'react';

export const useFocusOnMount = <T extends HTMLInputElement | HTMLTextAreaElement>() => {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
