import React, {useCallback, useMemo} from 'react';
import ToastList from '@/components/ToastList';
import {useApolloClient} from '@apollo/client';

import apolloAddToast from '@/apollo/addToast';
import ToastContext from './index';

const ToastProvider = ({children}) => {
  const client = useApolloClient();

  const addToast = useCallback((toastObj) => apolloAddToast(client, toastObj), [
    client,
  ]);

  const removeToast = useCallback(
    (_toastId) => {
      client.cache.modify({
        fields: {
          toastErrors(existingToastErrorRefs = [], {readField}) {
            return existingToastErrorRefs.filter(
              (ref) => readField('id', ref) !== _toastId,
            );
          },
        },
      });
    },
    [client],
  );

  const popToast = useCallback(() => {
    client.cache.modify({
      fields: {
        toastErrors(existingToastErrorRefs = [], {readField}) {
          if (existingToastErrorRefs.length === 0) {
            return existingToastErrorRefs;
          }
          return existingToastErrorRefs.slice(1);
        },
      },
    });
  }, [client]);

  const toastContext = useMemo(
    () => ({
      addToast,
      removeToast,
      popToast,
    }),
    [addToast, removeToast, popToast],
  );

  return (
    <ToastContext.Provider value={toastContext}>
      <ToastList />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
