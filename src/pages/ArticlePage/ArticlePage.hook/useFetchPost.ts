import { useEffect } from 'react';

import { useConnection } from '../../../hooks/useConnection';
import { useStores } from '../../../hooks/useStores';

export const useFetchPost = (title?: string) => {
  const isOnline = useConnection();
  const {postStore} = useStores();

  useEffect(() => {
    const abortController = new AbortController();
    isOnline && postStore.findPost(title || '', abortController.signal);

    return () => abortController.abort();
  }, [title, isOnline]);
};