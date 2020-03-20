import styled from '@emotion/native';

export const TextInput = styled.TextInput`
  padding: 12px 0;
  border-bottom-color: ${props => props.theme.colors.black.normal};
  border-bottom-width: 1px;
  color: ${props => props.theme.colors.black.normal};
  font-size: 16px;
  line-height: 19px;
`;

export const Container = styled.View`
  min-width: 65%;
`;

export const Label = styled.Text`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const Remark = styled.Text`
  font-size: 14px;
  line-height: 17px;
  margin-top: 5px;
`;
