import styled from '@emotion/native';
import Text from '@/components/AppText';

export const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 0;
  margin: 10px 0;
  align-items: center;
`;

export const View = styled.View``;

export const RowText = styled(Text)`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.5px;
`;
