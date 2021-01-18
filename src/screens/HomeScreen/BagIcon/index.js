import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const BagIcon = () => {
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
          d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8V20C22 20.7957 21.6839 21.5587 21.1213 22.1213C20.5587 22.6839 19.7957 23 19 23H5C4.20435 23 3.44129 22.6839 2.87868 22.1213C2.31607 21.5587 2 20.7956 2 20V8ZM4 9V20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21H19C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20V9H4Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 9C8.55228 9 9 8.55228 9 8V6C9 5.20435 9.31607 4.44129 9.87868 3.87868C10.4413 3.31607 11.2044 3 12 3C12.7956 3 13.5587 3.31607 14.1213 3.87868C14.6839 4.44129 15 5.20435 15 6V8C15 8.55228 15.4477 9 16 9C16.5523 9 17 8.55228 17 8V6C17 4.67392 16.4732 3.40215 15.5355 2.46447C14.5979 1.52678 13.3261 1 12 1C10.6739 1 9.40215 1.52678 8.46447 2.46447C7.52678 3.40215 7 4.67392 7 6V8C7 8.55228 7.44772 9 8 9Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
    </Svg>
  );
};

export default BagIcon;
