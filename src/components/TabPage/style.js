import styled from '@emotion/native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background1};
  flex: 1;
`;

export const TitleContainer = styled.View`
  padding: 0 30px;
  margin-bottom: 10px;
`;

export const Title = styled(TitleText)`
  font-size: 26px;
`;

export const SubTitle = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.colors.contrastColor};
  margin-top: 5px;
`;
