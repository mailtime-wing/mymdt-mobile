import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const Title = styled(TitleText)`
  color: ${props => props.theme.colors.contrastColor};
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-bottom: 12px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
`;

export const ModalView = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  background-color: ${props => props.theme.colors.background1};
  box-shadow: 0px 4px 10px ${props => props.theme.colors.borderColor};
  border-radius: 24px;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const CenteredView = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  background-color: #00000044;
`;

export const Modal = styled.Modal`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Divider = styled.View`
  border: 1px solid ${props => props.theme.colors.background2};
`;

export const ButtonContainers = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

export const MarginTop = styled.View`
  margin-top: 24px;
`;
