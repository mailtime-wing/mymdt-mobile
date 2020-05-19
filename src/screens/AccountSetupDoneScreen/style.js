import styled from '@emotion/native';
import Text, {TitleText} from '@/components/AppText';

export const Container = styled.View`
  padding: 340px 24px 0px 24px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 16px;
  text-transform: uppercase;
  text-align: center;
`;

export const Detail = styled(Text)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 242px;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;
