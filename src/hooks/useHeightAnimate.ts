import { useLayoutEffect, useRef } from 'react';

export const useHeightAnimate = <T extends HTMLElement>(isUpdate: boolean, extraHeight = 0, deps: any[] = []) => {
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    if (isUpdate && elementRef.current) {
      elementRef.current.style.maxHeight = `${elementRef.current.scrollHeight + extraHeight}px`;
    } else if (elementRef.current) {
      elementRef.current.style.maxHeight = '0px';
    }
  }, [...deps, isUpdate]);

  return elementRef;
};
