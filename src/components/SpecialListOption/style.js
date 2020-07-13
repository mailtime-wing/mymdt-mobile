import styled from '@emotion/native';
import Text from '@/components/AppText';

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
`;

export const RowText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;
