import styled from '@emotion/native';
import Text from '@/components/AppText';
import {Platform} from 'react-native';

export const ButtonsContainer = styled.View`
  padding: 0 16px;
  flex-direction: row;
`;

export const ButtonContainer = styled.TouchableOpacity`
  padding: 16px 8px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.background1};
  flex: 1;
  margin: 0 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(9, 48, 151, 0.1);
`;

export const ButtonText = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  color: ${props =>
    props.color ? props.color : props.theme.colors.contrastColor};
  margin-top: 8px;
`;
