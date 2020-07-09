import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
`;

export const TransactionContainer = styled.View`
  flex: 3;
  justify-content: center;
  margin-left: 16px;
  margin-right: 16px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  padding: 12px 0;
`;

export const Name = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

export const Date = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.black.superLight};
`;
