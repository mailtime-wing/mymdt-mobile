import styled from '@emotion/native';
import Text from '@/components/AppText';

export const HeaderDetail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.black.light};
`;

export const Detail = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  padding-top: 8px;
  padding-bottom: 16px;
  color: ${props => props.theme.colors.black.superLight};
  width: 70%;
`;

export const Header = styled(Text)`
  font-size: 16px;
  line-height: 21px;
  font-weight: bold;
  letter-spacing: 1px;
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

export const ScrollContainer = styled.ScrollView``;

export const Container = styled.View`
  padding: 0 24px;
`;

export const Divider = styled.View`
  border: 1px solid ${props => props.theme.colors.black.extremeLight};
  margin: 16px 0;
`;
