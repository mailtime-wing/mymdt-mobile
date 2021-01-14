import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const MymdtIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.5 23C18.5751 23 23.5 18.0751 23.5 12C23.5 5.92487 18.5751 1 12.5 1C6.42487 1 1.5 5.92487 1.5 12C1.5 18.0751 6.42487 23 12.5 23Z"
        stroke={theme.colors.secondary.normal}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 9V15"
        stroke={theme.colors.primary.normal}
        stroke-width="2.00001"
      />
      <Path
        d="M7.5 9L12.5 12"
        stroke={theme.colors.primary.normal}
        stroke-width="2.00001"
      />
      <Path
        d="M17.5001 9L12.5001 12"
        stroke={theme.colors.primary.normal}
        stroke-width="2.00001"
      />
      <Path
        d="M17.5001 9V15"
        stroke={theme.colors.primary.normal}
        stroke-width="2.00001"
      />
      <Circle
        cx="12.5"
        cy="12"
        r="1.50001"
        fill={theme.colors.primary.normal}
        stroke={theme.colors.primary.normal}
      />
      <Circle
        cx="17.5"
        cy="9.00001"
        r="1.50001"
        fill={theme.colors.primary.normal}
        stroke={theme.colors.primary.normal}
      />
      <Circle
        cx="17.5"
        cy="15"
        r="1.50001"
        fill={theme.colors.primary.normal}
        stroke={theme.colors.primary.normal}
      />
      <Circle
        cx="7.50001"
        cy="15"
        r="1.50001"
        fill={theme.colors.primary.normal}
        stroke={theme.colors.primary.normal}
      />
      <Circle
        cx="7.50001"
        cy="9.00001"
        r="1.50001"
        fill={theme.colors.primary.normal}
        stroke={theme.colors.primary.normal}
      />
    </Svg>
  );
};

export default MymdtIcon;
