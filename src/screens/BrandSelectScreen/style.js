import styled from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  margin-top: 100px;
  margin-bottom: 38px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const Details = styled.Text`
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.black.normal};
  margin-bottom: 30px;
`;
