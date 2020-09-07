import React from 'react';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

import {
  TransactionContainer,
  RowContainer,
  nameStyle,
  dateStyle,
} from './style';
import {useTheme} from 'emotion-theming';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

const TransactionItem = ({icon, name, date, coin, cardType}) => {
  const theme = useTheme();
  return (
    <RowContainer>
      <AppIcon
        color={theme.colors.background1}
        backgroundColor={
          cardType === MEASURABLE_REWARD_POINT
            ? theme.colors.secondary.normal
            : theme.colors.primary.normal
        }
        sizeVariant="small"
        svgIcon={icon}
      />
      <TransactionContainer>
        <AppText variant="body1" style={nameStyle(theme)}>
          {name}
        </AppText>
        <AppText variant="caption" style={dateStyle(theme)}>
          <FormattedDate
            value={date}
            year="numeric"
            month="long"
            day="2-digit"
          />
        </AppText>
      </TransactionContainer>
      {coin}
    </RowContainer>
  );
};

export default TransactionItem;
