import { useEffect } from 'react';

import { useConnection } from '../../../hooks/useConnection';
import { useStores } from '../../../hooks/useStores';
import { useToast } from '../../../hooks/useToast';

export const useFetchPost = (title?: string) => {
  const isOnline = useConnection();
  const {postStore} = useStores();
  const showToast = useToast();

  useEffect(() => {
    const abortController = new AbortController();
    isOnline && postStore.findPost(title || '', abortController.signal, showToast);

    return () => abortController.abort();
  }, [title, isOnline]);
};