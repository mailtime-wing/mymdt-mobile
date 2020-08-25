import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
`;

export const Detail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.textOnBackground.mediumEmphasis};
`;
