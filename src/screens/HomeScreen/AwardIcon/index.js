import React from 'react';
import {Svg, Path, G} from 'react-native-svg';

import {useTheme} from 'emotion-theming';

const AwardIcon = () => {
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
          d="M16.1585 12.8886C16.706 12.8159 17.2087 13.2009 17.2813 13.7484L18.4913 22.8684C18.5418 23.249 18.3699 23.6249 18.049 23.8357C17.7281 24.0465 17.3148 24.0549 16.9855 23.8574L12.5 21.1661L8.01452 23.8574C7.68525 24.0549 7.27193 24.0465 6.95099 23.8357C6.63004 23.6248 6.45817 23.2489 6.50873 22.8682L7.71873 13.7582C7.79145 13.2107 8.29421 12.8259 8.84169 12.8986C9.38917 12.9713 9.77403 13.4741 9.70132 14.0215L8.76447 21.075L11.9855 19.1424C12.3022 18.9524 12.6978 18.9524 13.0145 19.1424L16.2359 21.0752L15.2987 14.0114C15.2261 13.4639 15.611 12.9612 16.1585 12.8886Z"
          fill={theme.colors.secondary.normal}
        />
      </G>
      <G style="mix-blend-mode:multiply">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.5 2C9.18629 2 6.5 4.68629 6.5 8C6.5 11.3137 9.18629 14 12.5 14C15.8137 14 18.5 11.3137 18.5 8C18.5 4.68629 15.8137 2 12.5 2ZM4.5 8C4.5 3.58172 8.08172 0 12.5 0C16.9183 0 20.5 3.58172 20.5 8C20.5 12.4183 16.9183 16 12.5 16C8.08172 16 4.5 12.4183 4.5 8Z"
          fill={theme.colors.primary.normal}
        />
      </G>
    </Svg>
  );
};

export default AwardIcon;
