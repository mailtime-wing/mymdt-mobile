import React from 'react';
import {Svg, Path, G, Rect} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const CreditCardIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G style="mix-blend-mode:multiply">
        <Path
          d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
          stroke={theme.colors.secondary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M1 16H23"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Rect
          x="4.5"
          y="9.5"
          width="3"
          height="2"
          rx="0.5"
          fill={theme.colors.primary.normal}
        />
        <Rect
          x="4.5"
          y="9.5"
          width="3"
          height="2"
          rx="0.5"
          stroke={theme.colors.primary.normal}
        />
      </G>
    </Svg>
  );
};

export default CreditCardIcon;
