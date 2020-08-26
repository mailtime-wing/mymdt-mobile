import styled from '@emotion/native';
import Text from '@/components/AppText';

export const ScrollContainer = styled.ScrollView``;

export const RemainMDT = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

export const NotificationBell = styled.TouchableOpacity`
  margin-right: 24px;
`;

export const SettingButton = styled.TouchableOpacity``;

export const Card = styled.Image`
  margin: auto;
  border-radius: 12px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const RowContainer = styled.View`
  align-self: flex-end;
  flex-direction: row;
  margin-right: 32px;
`;
