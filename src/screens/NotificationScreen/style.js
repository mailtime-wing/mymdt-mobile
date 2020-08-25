import styled from '@emotion/native';
import Text from '@/components/AppText';

export const ScrollContainer = styled.ScrollView``;

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: left;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colors.background2};
  margin-left: 24px;
`;

export const NotificationContainer = styled.TouchableOpacity`
  padding: 16px 24px;
`;

export const Subject = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
`;
