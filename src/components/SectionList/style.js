import styled from '@emotion/native';

export const Spearator = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.grey.normal};
  margin-top: 5px;
  margin-bottom: 18px;
  width: 100%;
`;

export const MenuList = styled.FlatList`
  margin-bottom: 12px;
`;

export const ListTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 0 30px;
`;
