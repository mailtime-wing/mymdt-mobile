import React from 'react';
import {Svg, Path, G, Rect} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const CreditCardIcon = () => {
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.5 5C2.94772 5 2.5 5.44772 2.5 6V18C2.5 18.5523 2.94772 19 3.5 19H21.5C22.0523 19 22.5 18.5523 22.5 18V6C22.5 5.44772 22.0523 5 21.5 5H3.5ZM0.5 6C0.5 4.34315 1.84315 3 3.5 3H21.5C23.1569 3 24.5 4.34315 24.5 6V18C24.5 19.6569 23.1569 21 21.5 21H3.5C1.84315 21 0.5 19.6569 0.5 18V6Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.5 16C0.5 15.4477 0.947715 15 1.5 15H23.5C24.0523 15 24.5 15.4477 24.5 16C24.5 16.5523 24.0523 17 23.5 17H1.5C0.947715 17 0.5 16.5523 0.5 16Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Rect
          x="5"
          y="9.5"
          width="3"
          height="2"
          rx="0.5"
          fill={theme.colors.primary.normal}
        />
        <Rect
          x="5"
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
