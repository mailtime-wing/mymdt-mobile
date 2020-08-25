import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
  padding-bottom: 24px;
`;

export const Detail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const AmountCurrencyContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CurrencyContainer = styled.View`
  margin-right: 8px;
  flex: 1;
`;

export const AmountContainer = styled.View`
  flex: 2;
`;
