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
      buttonColor={theme.colors.white.normal}
      colorSwitchOff={theme.colors.secondary.normal}
      colorSwitchOn={theme.colors.secondary.normal}
      showText={false}
      value={props.value}
      {...props}
    />
  );
};

export default Switch;
