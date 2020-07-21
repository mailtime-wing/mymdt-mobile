import React from 'react';

import {ButtonsContainer, ButtonContainer, ButtonText} from './style';

const ActionButtons = ({actionList, color, navigation}) => {
  return (
    <ButtonsContainer>
      {actionList.length > 0 &&
        actionList.map((action, index) => (
          <ButtonContainer
            key={index}
            onPress={() => navigation.navigate(action.id)}>
            {action.icon}
            <ButtonText color={color}>{action.name}</ButtonText>
          </ButtonContainer>
        ))}
    </ButtonsContainer>
  );
};

export default ActionButtons;
