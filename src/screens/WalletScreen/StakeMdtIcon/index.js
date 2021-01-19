import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const StakeMdtIcon = () => {
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
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 14C2.55228 14 3 14.4477 3 15V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H20C20.2652 21 20.5195 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V15C21 14.4477 21.4477 14 22 14C22.5523 14 23 14.4477 23 15V20C23 20.7957 22.6839 21.5587 22.1213 22.1213C21.5587 22.6839 20.7956 23 20 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7956 1 20V15C1 14.4477 1.44772 14 2 14Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929L12 14.5858L15.2929 11.2929C15.6834 10.9024 16.3166 10.9024 16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 1C12.5523 1 13 1.44772 13 2V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V2C11 1.44772 11.4477 1 12 1Z"
          fill={theme.colors.primary.normal}
        />
      </G>
    </Svg>
  );
};

export default StakeMdtIcon;
