import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
  padding-bottom: 24px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
`;

export const RowHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowHeader = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

export const QuestionMark = styled.TouchableOpacity`
  margin-left: 4px;
`;

export const RowValue = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.superLight};
`;
