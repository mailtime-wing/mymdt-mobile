import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.white.normal};
  flex: 1;
`;

export const TitleContainer = styled.View`
  padding: 0 30px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 26px;
`;

export const SubTitle = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.colors.black.normal};
  margin-top: 5px;
`;
