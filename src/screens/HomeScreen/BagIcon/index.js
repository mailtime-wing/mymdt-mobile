import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const BagIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G style="mix-blend-mode:multiply">
        <Path
          d="M3.5 20V8H21.5V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20Z"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M8.5 8V6C8.5 4.93913 8.92143 3.92172 9.67157 3.17157C10.4217 2.42143 11.4391 2 12.5 2C13.5609 2 14.5783 2.42143 15.3284 3.17157C16.0786 3.92172 16.5 4.93913 16.5 6V8"
          stroke={theme.colors.secondary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default BagIcon;
