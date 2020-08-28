import React from 'react';
import Switches from 'react-native-switches';
import {useTheme} from 'emotion-theming';

const Switch = ({value, ...props}) => {
  const theme = useTheme();

  return (
    <Switches
      shape="pill"
      buttonSize={28}
      sliderWidth={60}
      sliderHeight={36}
      buttonOffsetLeft={4}
      buttonOffsetRight={6}
      buttonColor={
        value ? theme.colors.toggleOn.button : theme.colors.toggleOff.button
      }
      colorSwitchOff={theme.colors.toggleOff.track}
      colorSwitchOn={theme.colors.toggleOn.track}
      borderColor="transparent"
      showText={false}
      value={value}
      {...props}
    />
  );
};

export default Switch;
