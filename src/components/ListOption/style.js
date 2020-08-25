import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const ListLabel = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

export const ListValue = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Margin = styled.View`
  margin-right: 16px;
`;
