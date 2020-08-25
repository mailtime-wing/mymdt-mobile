import styled from '@emotion/native';

export const ModalView = styled.View`
  flex: 1;
  width: 90%;
  justify-content: center;
  box-shadow: 0px 4px 10px ${props => props.theme.colors.borderColor};
  border-radius: 24px;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000044;
`;

export const Modal = styled.Modal``;

export const Container = styled.View`
  padding: 24px 48px;
`;
