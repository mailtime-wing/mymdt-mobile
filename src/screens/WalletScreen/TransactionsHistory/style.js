import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';

export const HistoryListContainer = styled.View`
  background-color: ${props => props.theme.colors.white.normal};
  border-radius: 24px 24px 0px 0px;
  margin-top: 16px;
`;

export const HistoryListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px 24px 16px 24px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.05);
  elevation: 1;
  margin-bottom: 8px;
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  margin-right: 8px;
`;

export const FilterText = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${props => props.color && props.color};
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-left: 8px;
`;
