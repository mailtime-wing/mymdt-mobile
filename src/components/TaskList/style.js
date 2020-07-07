import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  flex: 3;
  justify-content: center;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  padding: 12px 0;
`;

export const TaskName = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

export const ClaimedDate = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.black.superLight};
`;
