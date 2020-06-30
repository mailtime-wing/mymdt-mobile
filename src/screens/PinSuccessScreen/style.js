import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
`;

export const ScrollContainer = styled.ScrollView``;

export const Detail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.light};
  margin-bottom: 500px;
`;
