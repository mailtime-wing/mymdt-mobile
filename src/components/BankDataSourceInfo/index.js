import React, {useEffect, useContext} from 'react';
import {useIntl} from 'react-intl';

import DataSourceInfo from '@/components/DataSourceInfo';
import useBankLogin from '@/hooks/useBankLogin';
import errorCodeEnum from '@/enum/errorCode';
import ToastContext from '@/context/toast';

const BankDataSourceInfo = ({type, countryCode, onConnected}) => {
  const intl = useIntl();
  const {addToast} = useContext(ToastContext);
  const [login, {isLoading, error}] = useBankLogin(type, countryCode, {
    onConnected,
  });

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.map((graphQLError) => {
          const code = graphQLError.extensions?.code;
          if (!code) {
            return;
          }
          switch (code) {
            case errorCodeEnum.DATA_ALREADY_EXIST: {
              addToast({
                text: intl.formatMessage({
                  id: 'this_card_is_already_bound',
                }),
                variant: 'error',
              });
              return;
            }
          }
        }, []);
        return;
      }

      addToast({
        text: intl.formatMessage({
          id: 'error.something_went_wrong_please_try_again_later',
        }),
        variant: 'error',
      });
    }
  }, [error, addToast, intl]);

  return (
    <DataSourceInfo type={type} onContinuePress={login} isLoading={isLoading} />
  );
};

export default BankDataSourceInfo;
