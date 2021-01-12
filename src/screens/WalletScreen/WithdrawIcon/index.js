import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const WithdrawIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/Svg">
      <G style="mix-blend-mode:multiply">
        <Path
          d="M22.5 15V20C22.5 20.5304 22.2893 21.0391 21.9142 21.4142C21.5391 21.7893 21.0304 22 20.5 22H4.5C3.96957 22 3.46086 21.7893 3.08579 21.4142C2.71071 21.0391 2.5 20.5304 2.5 20V15"
          stroke={theme.colors.secondary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M8.5 6L12.5 2L16.5 6"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M12.5 16V2"
          stroke={theme.colors.primary.normal}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default WithdrawIcon;
