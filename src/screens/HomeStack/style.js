import styled from '@emotion/native';
import {StyleSheet} from 'react-native';
import Text from '@/components/AppText';

export const Container = styled.View`
  flex: 1;
`;

export const LabelText = styled(Text)`
  color: ${props =>
    props.focused
      ? props.theme.colors.white.normal
      : props.theme.colors.black.light};
  font-size: 8px;
  line-height: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const styles = StyleSheet.create({
  tabBarContainer: {
    height: 88,
  },
  tabBar: {
    height: 60,
    padding: 8,
    marginTop: 5,
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
  safeAreaView: {
    backgroundColor: '#FDFBF2',
  },
});
