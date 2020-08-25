import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Title = styled(TitleText)`
  color: ${props => props.theme.colors.contrastColor};
  font-size: 24px;
  line-height: 29px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
`;

export const Detail = styled(Text)`
  color: ${props => props.theme.colors.textOnBackground.mediumEmphasis};
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const ModalView = styled.View`
  height: auto;
  width: 90%;
  justify-content: center;
  background-color: ${props => props.theme.colors.background1};
  box-shadow: 0px 4px 10px ${props => props.theme.colors.borderColor};
  border-radius: 24px;
  padding: 24px;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000044;
`;

export const Modal = styled.Modal``;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-items: space-between;
  align-self: center;
`;

export const MarginContainer = styled.View`
  margin-right: 8px;
`;
