import styled from '@emotion/native';
import Text, {TitleText} from '@/components/AppText';

export const Container = styled.ScrollView`
  margin-top: 100px;
  margin-bottom: 38px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const EmailRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  opacity: ${props => props.isNext && '0.1'};
`;

export const EmailContainer = styled.View`
  margin-right: 16px;
  flex: 1;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-bottom: 48px;
`;

export const Label = styled(Text)`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const BindMoreLaterText = styled(Text)`
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  margin-top: 8px;
  color: ${props => props.theme.colors.black.light};
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;
