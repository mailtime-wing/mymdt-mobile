import styled from '@emotion/native';
import Text from '@/components/AppText'

export const ButtonContainer = styled.TouchableOpacity`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  padding: 8px;
  height: auto;
  border: 1px solid ${props => props.theme.colors.secondary.light};
  border-radius: 24px;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: 14px;
  letter-spacing: 2px;
  color: ${props => props.theme.colors.secondary.normal};
  font-weight: bold;
`;

export const Icon = styled.Image`
  margin-right: 8px;
`;
