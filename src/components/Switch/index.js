import React from 'react';
import Switches from 'react-native-switches';
import {useTheme} from 'emotion-theming';

const Switch = props => {
  const theme = useTheme();

  return (
    <Switches
      shape="pill"
      buttonSize={28}
      sliderWidth={60}
      sliderHeight={36}
      buttonOffsetLeft={4}
      buttonOffsetRight={6}
      buttonColor={theme.colors.background1}
      colorSwitchOff={theme.colors.background3}
      colorSwitchOn={theme.colors.secondary.normal}
      borderColor="transparent"
      showText={false}
      value={props.value}
      {...props}
    />
  );
};

export default Switch;
