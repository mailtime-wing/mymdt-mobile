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
        const errorCode = error.graphQLErrors.find(
          (graphQLError) => graphQLError.extensions?.code,
        );

        switch (errorCode) {
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
      }

      if (error.code) {
        switch (error.code) {
          case errorCodeEnum.DATA_NOT_FOUND: {
            addToast({
              text: intl.formatMessage({
                id: 'error.no_credit_card_found',
              }),
              variant: 'error',
            });
            return;
          }
          case errorCodeEnum.DATA_INVALID: {
            addToast({
              text: intl.formatMessage({
                id: 'error.error_code_202',
              }),
              variant: 'error',
            });
            return;
          }
          case errorCodeEnum.BAD_CREDENTIAL: {
            addToast({
              text: intl.formatMessage({
                id: 'error.error_code_300',
              }),
              variant: 'error',
            });
            return;
          }
        }
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
