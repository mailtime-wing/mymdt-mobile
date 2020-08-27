import styled from '@emotion/native';
import {StyleSheet} from 'react-native';
import Text from '@/components/AppText';

export const LabelText = styled(Text)`
  color: ${props =>
    props.focused
      ? props.theme.colors.background1
      : props.theme.colors.textOnBackground.mediumEmphasis};
  font-size: 10px;
  line-height: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 8px;
`;

export const styles = StyleSheet.create({
  tabBarContainer: {
    height: 72,
    alignItems: 'center',
  },
  tabBar: {
    maxWidth: 60,
    aspectRatio: 1,
    paddingVertical: 8,
    marginVertical: 6,
    marginHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // shadowColor: 'rgba(33, 206, 219, 0.2)',
    // shadowOffset: {height: 6},
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 1,
  },
  tabBarShadow: {
    shadowColor: 'rgba(33, 206, 219, 0.2)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    display: 'none',
  },
  card: {
    backgroundColor: 'white',
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
