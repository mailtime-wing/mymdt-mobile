import React, {useState, useEffect} from 'react';

import DataSourceInfo from '@/components/DataSourceInfo';
import LoadingSpinner from '@/components/LoadingSpinner';
import useBankLogin from '@/hooks/useBankLogin';
import errorCodeEnum from '@/enum/errorCode';
import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {button, detail, modal} from './style';

const BankDataSourceInfo = ({type, countryCode, onConnected}) => {
  const theme = useTheme();
  const [login, {isError, isLoading, error}] = useBankLogin(type, countryCode, {
    onConnected,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isError && error) {
      if (error.graphQLErrors) {
        const errorCode = error.graphQLErrors[0]?.extensions?.code;
        if (errorCode === errorCodeEnum.DATA_ALREADY_EXIST) {
          setShow(true);
        }
      }
    }
  }, [error, isError]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <DataSourceInfo type={type} onContinuePress={login} />
      <AppModal visible={show} modalBodyStyle={modal} transparent>
        <AppText variant="heading3" style={detail(theme)}>
          <FormattedMessage id="this_card_is_already_bound" />
        </AppText>
        <AppButton
          onPress={() => setShow(false)}
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          text={<FormattedMessage id="button.okay" defaultMessage="Okay" />}
          style={button}
        />
      </AppModal>
    </>
  );
};

export default BankDataSourceInfo;
