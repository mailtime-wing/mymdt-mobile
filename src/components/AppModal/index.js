import React from 'react';
import {View, Modal} from 'react-native';
import {useTheme} from 'emotion-theming';

import {centered, modalContainer} from './style';

const AppModal = ({children, ...props}) => {
  const theme = useTheme();
  return (
    <Modal transparent {...props}>
      <View style={centered}>
        <View style={modalContainer(theme)}>{children}</View>
      </View>
    </Modal>
  );
};

export default AppModal;
