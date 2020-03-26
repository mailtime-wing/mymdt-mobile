import styled from '@emotion/native';

export const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white.normal};
`;

export const AccountInfoContainer = styled.View`
  margin-top: 65px;
  align-items: center;
  margin-bottom: 12px;
`;

export const AccountImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-bottom: 15px;
`;

export const AccountName = styled.Text`
  font-size: 21px;
  margin-bottom: 8px;
`;

export const AccountLevelContainer = styled.View`
  padding: 4px 12px;
  background-color: ${props => props.theme.colors.gold};
  border-radius: 32px;
  margin-bottom: 34px;
`;

export const AccountLevel = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

export const AccountCreditContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
`;

export const AccountCredit = styled.Text`
  flex: 1;
  font-size: 16px;
`;

export const RemainMDT = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
