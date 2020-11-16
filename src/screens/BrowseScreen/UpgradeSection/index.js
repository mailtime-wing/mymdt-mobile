import React, {useState} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {container, sectionTitle} from './style';
import AppText from '@/components/AppText2';
import Requirements from '@/components/Requirements';
import AppButton from '@/components/AppButton';
import PopupModal from '@/components/PopupModal';
import checkCanUpgrade from '@/utils/checkCanUpgrade';

const UpgradeSection = ({userNextLevel, style, ...props}) => {
  const theme = useTheme();
  const nextLevelString = (
    <FormattedMessage id={`membership_level_${userNextLevel}`} />
  );
  const [showConfirmUpgradePopup, setshowConfirmUpgradePopup] = useState(false);
  const handlePopupCallback = (cb) => {
    if (cb === 'OK') {
      // TODO: integrate upgrade api
    }
    setshowConfirmUpgradePopup(false);
  };

  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        container,
        style,
      ]}>
      <AppText variant="heading5" style={sectionTitle(theme)}>
        <FormattedMessage
          id="upgrade_to"
          defaultMessage="Upgrade to {nextLevel}"
          values={{
            nextLevel: nextLevelString,
          }}
        />
      </AppText>
      <Requirements {...props} />
      {checkCanUpgrade(
        props.membership,
        props.referFriendCount,
        props.bindDataSourceCount,
        props.currentStakeAmount,
      ) && (
        <AppButton
          onPress={() => setshowConfirmUpgradePopup(true)}
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          text={<FormattedMessage id="button.upgrade" />}
        />
      )}
      {showConfirmUpgradePopup && (
        <PopupModal
          title={
            <FormattedMessage
              id="confirm_upgrade"
              defaultMessage="Confirm Upgrade"
            />
          }
          detail={
            <FormattedMessage
              id="confirm_upgrade_to_next_level"
              defaultMessage="Are you sure to upgrade your membership to {next_level} level?"
              values={{next_level: nextLevelString}}
            />
          }
          callback={handlePopupCallback}
          okButtonLabel={
            <FormattedMessage id="button.confirm" defaultMessage="login" />
          }
        />
      )}
    </View>
  );
};

export default UpgradeSection;
