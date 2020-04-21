import React from 'react';
import Switches from 'react-native-switches';
import {useTheme} from 'emotion-theming';

const Switch = props => {
  const theme = useTheme();

  return (
    <Switches
      shape="pill"
      borderColor={theme.colors.black.normal}
      borderWidth={2}
      buttonSize={12}
      sliderHeight={20}
      sliderWidth={36}
      buttonOffsetLeft={2}
      buttonOffsetRight={6} // offsetLeft+border
      buttonColor={theme.colors.black.normal}
      colorSwitchOff={theme.colors.white.normal}
      colorSwitchOn={theme.colors.white.normal}
      showText={false}
      value={props.value}
      {...props}
    />
  );
};

export default Switch;
