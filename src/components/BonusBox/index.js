import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {
  titleText,
  detailText,
  iconStyle,
  card,
  headerContainer,
  headerRightContainer,
} from './style';

import AppText from '@/components/AppText2';

const BonusBox = ({title, detail, icon, children}) => {
  const theme = useTheme();
  return (
    <View style={card(theme)}>
      <View style={headerContainer}>
        {icon && <Image source={icon} style={iconStyle} />}
        <View style={headerRightContainer}>
          {!!title && (
            <AppText variant="heading3" style={titleText}>
              {title}
            </AppText>
          )}
          {!!detail && (
            <AppText variant="body1" style={detailText(theme)}>
              {detail}
            </AppText>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

export default BonusBox;
