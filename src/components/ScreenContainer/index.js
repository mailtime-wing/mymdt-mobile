import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Container} from './style';

// TODO: maybe this can be replaced by using `cardStyle` on screen component?
function ScreenContainer({children, hasTopBar, style, ...props}) {
  const {top} = useSafeAreaInsets();
  const marginTop = hasTopBar ? 14 : top + 24;

  return (
    <Container style={[{marginTop}, style]} hasTopBar={hasTopBar} {...props}>
      {children}
    </Container>
  );
}

ScreenContainer.defaultProps = {
  hasTopBar: false,
};

export default ScreenContainer;
