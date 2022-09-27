import { useLayoutEffect, useRef } from 'react';

import { useResize } from './useResize';

export const useHeightAnimate = <T extends HTMLElement>(isUpdate: boolean, extraHeight = 0, deps: any[] = []) => {
  const elementRef = useRef<T>(null);
  const width = useResize();

  useLayoutEffect(() => {
    if (isUpdate && elementRef.current) {
      elementRef.current.style.maxHeight = `${elementRef.current.scrollHeight + extraHeight}px`;
    } else if (elementRef.current) {
      elementRef.current.style.maxHeight = '0px';
    }
  }, [...deps, isUpdate, width]);

  return elementRef;
};
