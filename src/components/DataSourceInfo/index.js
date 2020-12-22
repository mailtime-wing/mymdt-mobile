import React from 'react';
import {FormattedMessage} from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'emotion-theming';

import Layout from './Layout';
import {screenStyle, container} from './style';

import bankSyncServerDataAPIType from '@/enum/bankSyncServerDataAPIType';
import MailTimeLogo from '@/assets/logo_mailtime.svg';
import PlaidLogo from '@/assets/logo_plaid.svg';
import CreditGoLogo from '@/assets/logo_creditgo.svg';
import PlantoLogo from '@/assets/logo_planto.svg';
import MailIcon from '@/assets/icon_mail.svg';
import BankIcon from '@/assets/icon_bank.svg';

const DataSourceInfo = ({type, onContinuePress, isLoading}) => {
  const theme = useTheme();

  const layouts = {
    mailtime: {
      logo: <MailTimeLogo />,
      rightIcon: MailIcon,
      title: <FormattedMessage id="we_partner_with_mailtime" />,
      descriptions: [
        {
          title: <FormattedMessage id="secure" defaultMessage="Secure" />,
          caption: <FormattedMessage id="your_transactional_ereceipts_are" />,
        },
        {
          title: <FormattedMessage id="private" defaultMessage="Private" />,
          caption: <FormattedMessage id="your_credentials_will_never_be" />,
        },
      ],
    },
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

  return (
    <SafeAreaView style={container} forceInset={{bottom: 'always'}}>
      <Layout
        style={screenStyle(theme)}
        isLoading={isLoading}
        {...layout}
        onContinuePress={onContinuePress}
      />
    </SafeAreaView>
  );
};

export default DataSourceInfo;
