import React from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import {APP_BAR_HEIGHT} from '@/constants/layout';

import {safeAreaStyle} from './style';

// TODO: maybe this can be replaced by using `cardStyle` on screen component?
function ScreenContainer({
  children,
  hasTopBar,
  headerTransparent,
  style,
  ...props
}) {
  const marginTop = headerTransparent
    ? hasTopBar
      ? APP_BAR_HEIGHT
      : 0
    : hasTopBar
    ? 14
    : 24;

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={[{marginTop}, style]} hasTopBar={hasTopBar} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}

ScreenContainer.defaultProps = {
  hasTopBar: false,
  headerTransparent: false,
};

export default ScreenContainer;
