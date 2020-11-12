import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

import {header, detail, modalContainer, button} from './style';

const ConfirmStakeModal = ({
  amount,
  expectedAvailableDate,
  onConfirmPress,
  ...props
}) => {
  const theme = useTheme();
  return (
    <AppModal transparent modalBodyStyle={modalContainer(theme)} {...props}>
      <AppText variant="heading3" style={header(theme)}>
        <FormattedMessage
          id="stake_mdt_successfully"
          defaultMessage="Stake MDT Successfully"
        />
      </AppText>
      <AppText variant="body1" style={detail(theme)}>
        <FormattedMessage
          id="stake_amount_and_date"
          defaultMessage="You have successfully staked {amount} until {date}."
          values={{
            amount: amount,
            date: expectedAvailableDate,
          }}
        />
      </AppText>
      <AppButton
        variant="filled"
        sizeVariant="normal"
        colorVariant="primary"
        text={<FormattedMessage id="button.confirm" />}
        style={button}
        onPress={onConfirmPress}
      />
    </AppModal>
  );
};

ConfirmStakeModal.defaultProps = {
  mask: '',
};

export default ConfirmStakeModal;
