import { useEffect, useRef } from 'react';

export const useUpdateCaretPosition = (deps: any[]) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const caretPositionRef = useRef<null | [number, number]>(null);

  useEffect(() => {
    if (textareaRef.current && caretPositionRef.current) {
      const [start, end] = caretPositionRef.current;

      textareaRef.current.selectionStart = start;
      textareaRef.current.selectionEnd = end;
      textareaRef.current.focus();
      caretPositionRef.current = null;
    }
  }, [...deps]);

  return {textareaRef, caretPositionRef};
};
