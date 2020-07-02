import React from 'react';
import {useHeaderHeight} from '@react-navigation/stack';

import {TOP_BAR_HEIGHT} from '@/constants/layout';

import {Container} from './style';

function ScreenContainer({children, hasTopBar, style, ...props}) {
  const headerHeight = useHeaderHeight();
  const marginTop = hasTopBar ? headerHeight : headerHeight - TOP_BAR_HEIGHT;

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
