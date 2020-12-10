import React, {
  useState,
  useCallback,
  createContext,
  useMemo,
  useEffect,
} from 'react';
import ToastList from '@/components/ToastList';
import {TOAST_ERRORS} from '@/api/data';
import {useQuery, useApolloClient} from '@apollo/client';

export const ToastContext = createContext();

function assignToastId(toastList) {
  let toastId = 1;
  if (toastList.length <= 0) {
    return toastList;
  }
  return toastList.map((te) => ({...te, id: toastId++}));
}

export const ToastProvider = ({children}) => {
  const client = useApolloClient();
  const [, setErrors] = useState(false);
  const {data} = useQuery(TOAST_ERRORS);
  const toastErrors = data.toastErrors;
  const _toastErrors = assignToastId(toastErrors);

  const addToast = useCallback(
    (toastObj) => {
      client.writeQuery({
        query: TOAST_ERRORS,
        data: {
          toastErrors: [...toastErrors, toastObj],
        },
      });
      setErrors((err) => !err);
    },
    [toastErrors, client],
  );

  const removeToast = useCallback(
    (_toastId) => {
      client.writeQuery({
        query: TOAST_ERRORS,
        data: {
          toastErrors: _toastErrors.filter((te) => te.id !== _toastId),
        },
      });
      setErrors((err) => !err);
    },
    [client, _toastErrors],
  );

  const toastContext = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (_toastErrors.length) {
        toastContext.removeToast(_toastErrors[0].id);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [toastContext, _toastErrors]);

  return (
    <ToastContext.Provider value={toastContext}>
      <ToastList toasts={_toastErrors} />
      {children}
    </ToastContext.Provider>
  );
};
