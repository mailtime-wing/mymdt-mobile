import React from 'react';
import {View, Modal} from 'react-native';
import {useTheme} from 'emotion-theming';

import {centered, modalBody} from './style';

const AppModal = ({children, modalBodyStyle, ...props}) => {
  const theme = useTheme();
  return (
    <Modal transparent {...props}>
      <View style={centered}>
        <View style={[modalBody(theme), modalBodyStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default AppModal;
