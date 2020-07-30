import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const Title = styled(TitleText)`
  color: ${props => props.theme.colors.black.normal};
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
  background-color: ${props => props.theme.colors.white.normal};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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
  background: red;
`;

export const Divider = styled.View`
  border: 1px solid ${props => props.theme.colors.black.extremeLight};
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
