import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const MymdtIcon = () => {
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
          d="M11.7392 1.07336C11.8993 0.975547 12.1006 0.975547 12.2607 1.07336L21.2607 6.57336C21.4963 6.71735 21.5706 7.0251 21.4266 7.26073C21.2826 7.49635 20.9749 7.57064 20.7392 7.42664L12.4999 2.39153V7.5C12.4999 7.77614 12.2761 8 11.9999 8C11.7238 8 11.4999 7.77614 11.4999 7.5V2.39153L3.26067 7.42664C3.02505 7.57064 2.7173 7.49635 2.57331 7.26073C2.42931 7.0251 2.5036 6.71735 2.73922 6.57336L11.7392 1.07336Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.7392 22.9266C11.8993 23.0245 12.1006 23.0245 12.2607 22.9266L21.2607 17.4266C21.4963 17.2826 21.5706 16.9749 21.4266 16.7393C21.2826 16.5036 20.9749 16.4294 20.7392 16.5734L12.4999 21.6085V16.5C12.4999 16.2239 12.2761 16 11.9999 16C11.7238 16 11.4999 16.2239 11.4999 16.5V21.6085L3.26067 16.5734C3.02505 16.4294 2.7173 16.5036 2.57331 16.7393C2.42931 16.9749 2.5036 17.2826 2.73922 17.4266L11.7392 22.9266Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.14674 6.47857C2.43473 6.00732 3.05022 5.85875 3.52147 6.14674L12 11.3281L20.4786 6.14674C20.9498 5.85875 21.5653 6.00732 21.8533 6.47857C22.1413 6.94983 21.9927 7.56531 21.5215 7.8533L12.5215 13.3533C12.2014 13.5489 11.7987 13.5489 11.4786 13.3533L2.47857 7.8533C2.00732 7.56531 1.85875 6.94983 2.14674 6.47857Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3 6C3.55228 6 4 6.44772 4 7V17C4 17.5523 3.55228 18 3 18C2.44772 18 2 17.5523 2 17V7C2 6.44772 2.44772 6 3 6Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21 6C21.5523 6 22 6.44772 22 7V17C22 17.5523 21.5523 18 21 18C20.4477 18 20 17.5523 20 17V7C20 6.44772 20.4477 6 21 6Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M5 7C5 8.10457 4.10457 9 3 9C1.89543 9 1 8.10457 1 7C1 5.89543 1.89543 5 3 5C4.10457 5 5 5.89543 5 7Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M5 17C5 18.1046 4.10457 19 3 19C1.89543 19 1 18.1046 1 17C1 15.8954 1.89543 15 3 15C4.10457 15 5 15.8954 5 17Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M23 17C23 18.1046 22.1046 19 21 19C19.8954 19 19 18.1046 19 17C19 15.8954 19.8954 15 21 15C22.1046 15 23 15.8954 23 17Z"
          fill={theme.colors.primary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          d="M23 7C23 8.10457 22.1046 9 21 9C19.8954 9 19 8.10457 19 7C19 5.89543 19.8954 5 21 5C22.1046 5 23 5.89543 23 7Z"
          fill={theme.colors.primary.normal}
        />
      </G>
    </Svg>
  );
};

export default MymdtIcon;
