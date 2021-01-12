import React from 'react';
import {Svg, Path, G, Rect, Defs, ClipPath} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const ConvertIcon = () => {
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
          d="M22.5 5.99756V9.99756H18.5"
          stroke={theme.colors.secondary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M2.5 18V14H6.5"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M2.5 14L7.02335 18.3615C8.07107 19.4371 9.36727 20.2229 10.791 20.6455C12.2147 21.068 13.7195 21.1137 15.1651 20.778C16.6106 20.4424 17.9498 19.7365 19.0575 18.7262C20.1653 17.7159 21.0056 16.434 21.5 15.0003"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M3.5 8.99966C3.99442 7.56596 4.83471 6.28415 5.94248 5.27382C7.05024 4.26349 8.38937 3.55759 9.83491 3.22197C11.2805 2.88635 12.7853 2.93195 14.209 3.35453C15.6327 3.7771 16.9289 4.56288 17.9767 5.63853L22.5 10"
          stroke={theme.colors.secondary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default ConvertIcon;
