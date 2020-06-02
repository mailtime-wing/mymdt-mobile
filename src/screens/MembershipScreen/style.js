import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View``;

export const Header = styled(Text)`
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const CardContainer = styled.View`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 17px;
`;

export const CardImage = styled.Image``;

export const Offer = styled(Text)`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 2.33333px;
  text-transform: uppercase;
  margin-top: 16px;
  margin-bottom: 7px;
`;

export const Birthday = styled(Text)`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 2.33333px;
  text-transform: uppercase;
  margin-top: 31px;
  margin-bottom: 31px;
`;

export const ExpirationDateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 31px;
  margin-bottom: 45px;
`;

export const ExpirationDate = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Date = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 2.33333px;
  text-transform: uppercase;
`;

export const NextLevel = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Level = styled(Text)`
  font-weight: bold;
  font-size: 21px;
  line-height: 27px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 23px;
`;

export const MembershipProgram = styled(Text)`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 86px;
  margin-bottom: 8px;
`;
