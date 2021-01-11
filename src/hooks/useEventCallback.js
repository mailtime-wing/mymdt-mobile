import {useRef, useEffect, useCallback} from 'react';

// https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
export default function useEventCallback(fn, dependencies = []) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const _fn = ref.current;
    return _fn();
  }, [ref]);
}
