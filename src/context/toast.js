import React, {
  useState,
  useCallback,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import ToastList from '@/components/ToastList';

export const ToastContext = createContext();

export const ToastProvider = ({children}) => {
  const [toasts, setToasts] = useState([]);
  let toastId = 1;

  const addToast = useCallback(
    toastObj =>
      setToasts(_toasts => [..._toasts, {...toastObj, id: toastId++}]),
    [toastId],
  );

  const removeToast = useCallback(_toastId => {
    setToasts(_toasts => _toasts.filter(t => t.id !== _toastId));
  }, []);

  const toastContext = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length) {
        toastContext.removeToast(toasts[0].id);
      }
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [toastContext, toasts]);

  return (
    <ToastContext.Provider value={toastContext}>
      <ToastList toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};
