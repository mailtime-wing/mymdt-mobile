import styled from '@emotion/native';

export const TextInput = styled.TextInput`
  padding: 12px 0;
  border-bottom-color: ${props => props.theme.colors.black};
  border-bottom-width: 1px;
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
