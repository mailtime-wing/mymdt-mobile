import React from 'react';

import DataSourceInfo from '@/components/DataSourceInfo';
import LoadingSpinner from '@/components/LoadingSpinner';
import useBankLogin from '@/hooks/useBankLogin';

const BankDataSourceInfo = ({type, countryCode, onConnected}) => {
  const [login, {isError, isLoading}] = useBankLogin(type, countryCode, {
    onConnected,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // TODO: handle error
  }

  return <DataSourceInfo type={type} onContinuePress={login} />;
};

export default BankDataSourceInfo;
