import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const MailIcon = () => {
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
          d="M4.5 5C3.95228 5 3.5 5.45228 3.5 6V18C3.5 18.5477 3.95228 19 4.5 19H20.5C21.0477 19 21.5 18.5477 21.5 18V6C21.5 5.45228 21.0477 5 20.5 5H4.5ZM1.5 6C1.5 4.34772 2.84772 3 4.5 3H20.5C22.1523 3 23.5 4.34772 23.5 6V18C23.5 19.6523 22.1523 21 20.5 21H4.5C2.84772 21 1.5 19.6523 1.5 18V6Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.68085 5.4265C1.99757 4.97405 2.6211 4.86402 3.07355 5.18073L12.5001 11.7793L21.9266 5.18073C22.3791 4.86402 23.0026 4.97405 23.3193 5.4265C23.636 5.87895 23.526 6.50248 23.0735 6.8192L13.0735 13.8192C12.7292 14.0602 12.2709 14.0602 11.9266 13.8192L1.92662 6.8192C1.47417 6.50248 1.36414 5.87895 1.68085 5.4265Z"
          fill={theme.colors.primary.normal}
        />
      </G>
    </Svg>
  );
};

export default MailIcon;
