import React from 'react';
import {ScrollView, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';

import Layout from './Layout';
import {screenStyle} from './style';

import ScreenContainer from '@/components/ScreenContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import useBankLogin from '@/hooks/useBankLogin';
import bankSyncServerDataAPIType from '@/enum/bankSyncServerDataAPIType';
import PlaidLogo from '@/assets/logo-plaid.svg';
import BankIcon from '@/assets/icon_bank.svg';

const layouts = {
  [bankSyncServerDataAPIType.PLAID]: {
    logo: <PlaidLogo />,
    rightIcon: <BankIcon />,
    title: (
      <FormattedMessage
        id="we_partner_with_plaid"
        defaultMessage="We partner with Plaid to securely link your card"
      />
    ),
    descriptions: [
      {
        title: <FormattedMessage id="secure" defaultMessage="Secure" />,
        caption: (
          <FormattedMessage
            id="transfer_of_your_information"
            defaultMessage="Transfer of your information is encrypted end-to-end"
          />
        ),
      },
      {
        title: <FormattedMessage id="private" defaultMessage="Private" />,
        caption: (
          <FormattedMessage
            id="your_credentials_will_never_be"
            defaultMessage="Your credentials will never be made accessible to RewardMe"
          />
        ),
      },
    ],
  },
  [bankSyncServerDataAPIType.PLANTO]: {
    logo: (
      <Image
        source={require('@/assets/logo-planto.png')}
        width={36}
        height={36}
      />
    ),
    rightIcon: <BankIcon />,
    title: (
      <FormattedMessage
        id="we_partner_with_plaid"
        defaultMessage="We partner with Planto to securely link your card"
      />
    ),
    descriptions: [
      {
        title: <FormattedMessage id="secure" defaultMessage="Secure" />,
        caption: (
          <FormattedMessage
            id="transfer_of_your_information"
            defaultMessage="Transfer of your information is encrypted end-to-end"
          />
        ),
      },
      {
        title: <FormattedMessage id="private" defaultMessage="Private" />,
        caption: (
          <FormattedMessage
            id="your_credentials_will_never_be"
            defaultMessage="Your credentials will never be made accessible to RewardMe"
          />
        ),
      },
    ],
  },
};

const DataSourceInfo = ({type, countryCode, onConnected}) => {
  const layout = layouts[type];

  const [login, {isError, isLoading}] = useBankLogin(type, countryCode, {
    onConnected,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // TODO: handle error
  }

  return (
    <ScrollView>
      <ScreenContainer hasTopBar style={screenStyle}>
        <Layout {...layout} onContinuePress={login} />
      </ScreenContainer>
    </ScrollView>
  );
};

export default DataSourceInfo;
