import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {APP_BAR_HEIGHT} from '@/constants/layout';

import {Container} from './style';

// TODO: maybe this can be replaced by using `cardStyle` on screen component?
function ScreenContainer({
  children,
  hasTopBar,
  headerTransparent,
  style,
  ...props
}) {
  const {top} = useSafeAreaInsets();
  const marginTop = headerTransparent
    ? hasTopBar
      ? top + APP_BAR_HEIGHT
      : top
    : hasTopBar
    ? 14
    : top + 24;

  return (
    <Container style={[{marginTop}, style]} hasTopBar={hasTopBar} {...props}>
      {children}
    </Container>
  );
}

ScreenContainer.defaultProps = {
  hasTopBar: false,
  headerTransparent: false,
};

export default ScreenContainer;
