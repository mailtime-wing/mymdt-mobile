import styled from '@emotion/native';

export const AccountIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.black.extremeLight};
`;

export const MembershipIconContainer = styled.TouchableOpacity`
  flex: 1;
`;

export const Container = styled.View`
  justify-content: center;
`;

export const AccountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const CoinChip = styled.View`
  padding: 8px;
  background-color: ${props => props.theme.colors.white.normal};
  border-radius: 24px;
`;

export const MarginRight = styled.View`
  margin-right: 8px;
`;
