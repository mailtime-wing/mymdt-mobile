import React from 'react';
import {TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import AppIcon from '@/components/AppIcon';

import {ButtonsContainer, ButtonText, buttonContainer} from './style';

const ActionButtons = ({actionList, color, buttonsStyle, navigation}) => {
  const theme = useTheme();
  return (
    <ButtonsContainer>
      {actionList.length > 0 &&
        actionList.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(action.id, {
                from: action.from,
                to: action.to,
              })
            }
            style={[
              css`
                ${buttonsStyle}
              `,
              buttonContainer,
            ]}>
            <AppIcon
              color={theme.colors.background1}
              backgroundColor={color}
              sizeVariant="small"
              svgIcon={action.icon}
            />
            <ButtonText color={color}>{action.name}</ButtonText>
          </TouchableOpacity>
        ))}
    </ButtonsContainer>
  );
};

export default ActionButtons;
