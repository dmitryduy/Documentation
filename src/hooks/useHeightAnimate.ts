import { useLayoutEffect, useRef } from 'react';

import { useResize } from './useResize';

interface IConfig {
  extraHeight?: number,
  deps?: any[],
  maxHeight?: number;
}

export const useHeightAnimate = <T extends HTMLElement>(isUpdate: boolean, config: IConfig = {}) => {
  const elementRef = useRef<T>(null);
  const width = useResize();

  const {extraHeight = 0, maxHeight = Infinity, deps = []} = config;

  useLayoutEffect(() => {
    if (isUpdate && elementRef.current) {
      elementRef.current.style.maxHeight = `${Math.min(elementRef.current.scrollHeight + extraHeight, maxHeight)}px`;
    } else if (elementRef.current) {
      elementRef.current.style.maxHeight = '0px';
    }
  }, [...deps, isUpdate, width]);

  return elementRef;
};
