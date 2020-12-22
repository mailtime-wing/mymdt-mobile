import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

/**
 * @typedef {import('react-native').KeyboardAvoidingViewProps} KeyboardAvoidingViewProps
 * @type {import('react').FunctionComponent<KeyboardAvoidingViewProps>}
 */
const AppKeyboardAvoidingView = (props) => {
  // this should be top of safe-area inset + APP_BAR_HEIGHT (64)
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      {...props}
    />
  );
};

export default AppKeyboardAvoidingView;
