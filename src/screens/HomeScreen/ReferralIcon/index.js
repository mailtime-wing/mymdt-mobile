import React from 'react';
import {Svg, Path} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const ReferralIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14 13H19.5C21.1569 13 22.5 14.3431 22.5 16V17"
        stroke={theme.colors.secondary.normal}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.5 20V19C2.5 17.3431 3.84315 16 5.5 16H11.5C13.1569 16 14.5 17.3431 14.5 19V20"
        stroke={theme.colors.primary.normal}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.5 10C19.1569 10 20.5 8.65685 20.5 7C20.5 5.34315 19.1569 4 17.5 4C15.8431 4 14.5 5.34315 14.5 7C14.5 8.65685 15.8431 10 17.5 10Z"
        stroke={theme.colors.secondary.normal}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.5 13C10.1569 13 11.5 11.6569 11.5 10C11.5 8.34315 10.1569 7 8.5 7C6.84315 7 5.5 8.34315 5.5 10C5.5 11.6569 6.84315 13 8.5 13Z"
        stroke={theme.colors.primary.normal}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ReferralIcon;
