import React from 'react';
import {Svg, Path} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const ReferralIcon = () => {
  const theme = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5 13C12.5 12.4477 12.9477 12 13.5 12H19C21.2091 12 23 13.7909 23 16V17C23 17.5523 22.5523 18 22 18C21.4477 18 21 17.5523 21 17V16C21 14.8954 20.1046 14 19 14H13.5C12.9477 14 12.5 13.5523 12.5 13Z"
        fill={theme.colors.secondary.normal}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 17C3.89543 17 3 17.8954 3 19V20C3 20.5523 2.55228 21 2 21C1.44772 21 1 20.5523 1 20V19C1 16.7909 2.79086 15 5 15H11C13.2091 15 15 16.7909 15 19V20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20V19C13 17.8954 12.1046 17 11 17H5Z"
        fill={theme.colors.primary.normal}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 5C15.8954 5 15 5.89543 15 7C15 8.10457 15.8954 9 17 9C18.1046 9 19 8.10457 19 7C19 5.89543 18.1046 5 17 5ZM13 7C13 4.79086 14.7909 3 17 3C19.2091 3 21 4.79086 21 7C21 9.20914 19.2091 11 17 11C14.7909 11 13 9.20914 13 7Z"
        fill={theme.colors.secondary.normal}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 8C6.89543 8 6 8.89543 6 10C6 11.1046 6.89543 12 8 12C9.10457 12 10 11.1046 10 10C10 8.89543 9.10457 8 8 8ZM4 10C4 7.79086 5.79086 6 8 6C10.2091 6 12 7.79086 12 10C12 12.2091 10.2091 14 8 14C5.79086 14 4 12.2091 4 10Z"
        fill={theme.colors.primary.normal}
      />
    </Svg>
  );
};

export default ReferralIcon;
