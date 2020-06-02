import styled from '@emotion/native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Title = styled(TitleText)`
  color: ${props => props.theme.colors.black.normal};
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
`;

export const Detail = styled(Text)`
  color: ${props => props.theme.colors.black.light};
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const ModalView = styled.View`
  height: auto;
  width: 90%;
  justify-content: center;
  background-color: ${props => props.theme.colors.white.normal};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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
