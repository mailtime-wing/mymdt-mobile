import React, {useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';

import MembershipCard from '@/components/MembershipCard';
import AppText from '@/components/AppText2';
import LinearGradient from 'react-native-linear-gradient';
import membershipLevel from '@/enum/membershipLevel';
import TransactionAmount from '@/components/TransactionAmount';

import StakeMdt from '@/components/StakeMdt';
import DepositMdt from '@/components/DepositMdt';
import CryptoExchanges from '@/components/CryptoExchanges';

import {
  container,
  availableMdtSection,
  amount as stakeAmountStyle,
  availableAmount as availableAmountStyle,
  caption as captionStyle,
  staking as stakingStyle,
  mediumEmphasis,
  percentage,
} from './style';

const detailList = [
  {
    level: membershipLevel.ELITE,
    amount: 100000,
    pa: 8,
  },
  {
    level: membershipLevel.INFINITE,
    amount: 250000,
    pa: 15,
  },
  {
    level: membershipLevel.INFINITE_PRIVILEGE,
    amount: 1000000,
    pa: 20,
  },
];

const StackSection = ({
  backgroundGradientColors,
  level,
  availableMdt = 300000,
}) => {
  const theme = useTheme();
  const [address] = useState('0x16qjQCfDS4LV3MkgWCe8CFm5WD3FFmZwKH');

  const {amount: stakeAmount, pa} = detailList.find(
    (detail) => detail.level === level,
  );
  const remainingUnstakeAmount = availableMdt - stakeAmount;

  return (
    <>
      <LinearGradient colors={backgroundGradientColors}>
        <View style={container}>
          <MembershipCard userLevel={level} />
          <TransactionAmount
            amount={stakeAmount}
            unitVariant="MDT"
            unitSizeVariant="normal"
            amountSizeVariant="large"
            amountColor={theme.colors.textOnBackground.highEmphasis}
            variant="to"
            style={stakeAmountStyle}
            showDecimal={false}
          />
          <AppText variant="caption" style={stakingStyle(theme)}>
            Staking for 180 days
          </AppText>
          <AppText variant="caption" style={captionStyle(theme)}>
            <FormattedMessage
              id="you_will_enjoy_pa_percentage"
              values={{
                pa_percentage: (
                  <AppText variant="caption" style={percentage(theme)}>
                    {pa}% <FormattedMessage id="per_annum" />
                  </AppText>
                ),
              }}
            />
          </AppText>
        </View>
      </LinearGradient>
      <View style={[availableMdtSection(theme)]}>
        <AppText variant="subTitle3" style={[mediumEmphasis(theme)]}>
          Available MDT
        </AppText>
        <TransactionAmount
          amount={availableMdt}
          unitVariant="MDT"
          unitSizeVariant="small"
          amountColor={theme.colors.textOnBackground.mediumEmphasis}
          variant="to"
          style={availableAmountStyle}
          showDecimal={false}
        />
      </View>
      {remainingUnstakeAmount >= 0 ? (
        <StakeMdt
          stakeAmount={stakeAmount}
          remainingUnstakeAmount={remainingUnstakeAmount}
          pa={pa}
        />
      ) : (
        <>
          <DepositMdt
            availableMdt={availableMdt}
            depositAmount={stakeAmount - availableMdt}
            address={address}
          />
          <CryptoExchanges />
        </>
      )}
    </>
  );
};

export default StackSection;
