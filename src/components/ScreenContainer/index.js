import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
      ? // TODO: replace 64 with constant
        top + 64
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
