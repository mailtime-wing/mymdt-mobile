import React, {useEffect, useContext} from 'react';
import {useIntl} from 'react-intl';

import DataSourceInfo from '@/components/DataSourceInfo';
import errorCodeEnum from '@/enum/errorCode';
import ToastContext from '@/context/toast';
import {BankContext} from '@/context/bank';
import useEventCallback from '@/hooks/useEventCallback';

const BankDataSourceInfo = ({type, countryCode, onConnected}) => {
  const intl = useIntl();
  const {addToast} = useContext(ToastContext);
  const {setup, login, isLoading, isLoadingAccountDetails, error} = useContext(
    BankContext,
  );

  const _onConnected = useEventCallback(onConnected);

  useEffect(() => {
    const reset = setup(type, countryCode);

    return () => {
      reset();
    };
  }, [setup, type, countryCode]);

  useEffect(() => {
    if (isLoadingAccountDetails) {
      _onConnected();
    }
  }, [isLoadingAccountDetails, _onConnected]);

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors) {
        const graphQLError = error.graphQLErrors.find(
          (_graphQLError) => _graphQLError.extensions?.code,
        );

        if (graphQLError?.extensions?.code) {
          switch (graphQLError.extensions.code) {
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
