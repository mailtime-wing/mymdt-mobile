import React from 'react';
import {Text, AppTitleText} from './style';

const AppText = props => <Text {...props}>{props.children}</Text>;

export const TitleText = props => (
  <AppTitleText {...props}>{props.children}</AppTitleText>
);

export default AppText;
