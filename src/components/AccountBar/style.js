import styled from '@emotion/native';

export const AccountIcon = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

export const Container = styled.View`
  justify-content: center;
  padding: 30px;
  background-color: ${props => props.theme.colors.white.normal};
`;

export const AccountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const RemainMDT = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
