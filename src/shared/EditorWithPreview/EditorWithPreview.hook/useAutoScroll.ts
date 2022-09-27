import { useEffect, useRef } from 'react';

import { isElementScrollToBottom } from '../NewPostPage.utils/isElementScrollToBottom';

export const useAutoScroll = (isDefaultScroll: boolean, scrollOnUpdate: any[]) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const isScrollRef = useRef(isDefaultScroll);

  const scrollToBottomIsNeeded = () => {
    if (previewRef.current && isScrollRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottomIsNeeded(), [...scrollOnUpdate]);

  useEffect(() => {
    const onScroll = () => {
      if (previewRef.current && isElementScrollToBottom(previewRef.current)) {
        isScrollRef.current = true;
        return;
      }
      if (isScrollRef.current) {
        isScrollRef.current = false;
        return;
      }
      isScrollRef.current = false;
    };

    previewRef?.current?.addEventListener('scroll', onScroll);

    return () => previewRef?.current?.removeEventListener('scroll', onScroll);
  }, []);

  return previewRef;
};
