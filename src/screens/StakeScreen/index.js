import React, {useState, useLayoutEffect} from 'react';
import {FormattedDate} from 'react-intl';
import {View, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';

import AppIcon from '@/components/AppIcon';
import StakeMdt from '@/components/StakeMdt';
import DepositMdt from '@/components/DepositMdt';
import CryptoExchanges from '@/components/CryptoExchanges';
import ConfirmStakeModal from '@/components/ConfirmStakeModal';

import {GET_CURRENCY_BALANCE_API} from '@/api/data';
import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import LockIcon from '@/assets/icon_lock.svg';

import {
  marginTop,
  sectionContainer,
  lowerHalfSectionContainer,
  stakeAmount as stakeAmountText,
  icon,
  center,
  availableMdtContainer,
} from './style';

const AvailableMDT = ({amount}) => {
  const theme = useTheme();
  return (
    <View style={availableMdtContainer(theme)}>
      <TransactionAmount
        amount={amount}
        unitVariant="MDT"
        unitColor={theme.colors.primary.normal}
        unitSizeVariant="small"
        amountSizeVariant="normal"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        style={center}
      />
    </View>
  );
};

const StackScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_CURRENCY_BALANCE_API, {
    variables: {currencyCode: MEASURABLE_DATA_TOKEN},
  });
  const [address] = useState('0x16qjQCfDS4LV3MkgWCe8CFm5WD3FFmZwKH');
  const [showConfirmStakeModal, setShowConfirmStakeModal] = useState(false);
  const stakingPlan = route.params;
  const availableMdt =
    data?.userProfile?.currencyAccounts[0]?.balance + 200000 || 0;
  const stakeAmount = stakingPlan.amount;
  const stakeDate = new Date();
  const expectedAvailableDate = new Date().setDate(
    stakeDate.getDate() + stakingPlan.lockupPeriodInDay || 0,
  );
  const remainingUnstakeAmount = availableMdt - stakeAmount;
  const isStakeAvailable = remainingUnstakeAmount >= 0;

  const handleConfirmStakePress = () => {
    // TODO: integrate stake API
    setShowConfirmStakeModal(true);
  };

  const handleConfirmPress = () => {
    setShowConfirmStakeModal(false);
    navigation.pop();
  };

  useLayoutEffect(() => {
    // TODO: refactor theme object base on new design system later
    // TODO: resize the modal height to perform half-screen modal?
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent',
        backgroundColor: theme.colors.background1,
      },
      cardStyle: {
        backgroundColor: theme.colors.background4,
      },
      headerRight: () => <AvailableMDT amount={availableMdt} />,
    });
  });

  return (
    <ScrollView>
      <View style={lowerHalfSectionContainer(theme)}>
        <AppIcon
          color={theme.colors.background1}
          backgroundColor={theme.colors.primary.normal}
          sizeVariant="normal"
          svgIcon={LockIcon}
          style={[icon, center]}
        />
        <AppText variant="label" style={stakeAmountText(theme)}>
          STAKE AMOUNT
        </AppText>
        <TransactionAmount
          amount={stakeAmount}
          unitVariant="MDT"
          unitColor={theme.colors.primary.normal}
          unitSizeVariant="small"
          amountSizeVariant="large"
          amountColor={theme.colors.textOnBackground.mediumEmphasis}
          showDecimal={false}
          style={center}
        />
        <View style={marginTop}>
          {isStakeAvailable ? (
            <StakeMdt
              stakingPlan={stakingPlan}
              remainingUnstakeAmount={remainingUnstakeAmount}
              expectedAvailableDate={expectedAvailableDate}
              stakeDate={stakeDate}
              onConfirmStakePress={handleConfirmStakePress}
            />
          ) : (
            <DepositMdt
              availableMdt={availableMdt}
              depositAmount={stakeAmount - availableMdt}
              address={address}
            />
          )}
        </View>
      </View>
      {!isStakeAvailable && (
        <View style={sectionContainer(theme)}>
          <CryptoExchanges />
        </View>
      )}
      <ConfirmStakeModal
        visible={showConfirmStakeModal}
        amount={
          <TransactionAmount
            amount={stakeAmount}
            unitVariant="MDT"
            unitColor={theme.colors.textOnBackground.mediumEmphasis}
            unitSizeVariant="normal"
            amountSizeVariant="normal"
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
            showDecimal={false}
            style={center}
          />
        }
        expectedAvailableDate={<FormattedDate value={expectedAvailableDate} />}
        onConfirmPress={handleConfirmPress}
      />
    </ScrollView>
  );
};

export default StackScreen;
