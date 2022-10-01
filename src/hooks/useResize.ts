import { useEffect, useState } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.outerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.outerWidth);

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
};
