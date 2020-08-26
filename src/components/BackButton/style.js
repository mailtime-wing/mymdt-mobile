import styled from '@emotion/native';

import Text from '@/components/AppText';

export const ButtonContainer = styled.TouchableOpacity`
  padding: 8px;
  height: 36px;
  border: 1px solid ${props => props.theme.colors.secondary.border};
  border-radius: 24px;
  background: transparent;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${props => props.theme.colors.secondary.normal};
  font-weight: bold;
  text-transform: uppercase;
`;

export const BackArrowIcon = styled.Image`
  margin-right: 8px;
`;
