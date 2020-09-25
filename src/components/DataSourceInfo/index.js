import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';

import Layout from './Layout';
import {screenStyle} from './style';

import ScreenContainer from '@/components/ScreenContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import useBankLogin from '@/hooks/useBankLogin';
import bankSyncServerDataAPIType from '@/enum/bankSyncServerDataAPIType';
import PlaidLogo from '@/assets/logo_plaid.svg';
import CreditGoLogo from '@/assets/logo_creditgo.svg';
import PlantoLogo from '@/assets/logo_planto.svg';
import BankIcon from '@/assets/icon_bank.svg';
import {useTheme} from 'emotion-theming';

const DataSourceInfo = ({type, countryCode, onConnected}) => {
  const theme = useTheme();

  const layouts = {
    [bankSyncServerDataAPIType.PLAID]: {
      logo: <PlaidLogo fill={theme.colors.logo.plaid} />,
      rightIcon: BankIcon,
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
      logo: <PlantoLogo />,
      rightIcon: BankIcon,
      title: (
        <FormattedMessage
          id="we_partner_with_planto"
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
    [bankSyncServerDataAPIType.CREDIGO]: {
      logo: <CreditGoLogo />,
      rightIcon: BankIcon,
      title: (
        <FormattedMessage
          id="we_partner_with_credigo"
          defaultMessage="We partner with CrediGO to securely link your card"
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
