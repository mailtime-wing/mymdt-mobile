import styled from '@emotion/native';
import Text from '@/components/AppText';

export const LevelChip = styled.View`
  padding: 0 8px;
  border-radius: 34px;
  height: 16px;
  background: ${props => props.background};
  width: auto;
  align-self: center;
`;

export const LevelText = styled(Text)`
  color: ${props => props.color};
  font-size: 12px;
  line-height: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
