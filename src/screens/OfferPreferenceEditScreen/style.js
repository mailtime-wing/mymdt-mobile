import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  margin-top: 12px;
  margin-bottom: 40px;
`;

export const Header = styled(Text)`
  font-size: 16px;
  line-height: 21px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const NumberOfBrand = styled(Text)`
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
