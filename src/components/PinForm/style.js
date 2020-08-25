import styled from '@emotion/native';
import {Platform, StyleSheet} from 'react-native';
import TitleText from '@/components/TitleText';
import Text from '@/components/AppText';

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const Container = styled.View`
  margin-top: 92px;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 24px;
`;

export const Hints = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export const Error = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.textOnError.normal};
  text-align: center;
`;

export const styles = StyleSheet.create({
  pinDot: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#21CEDB',
  },
  pinMask: {
    width: 16,
    height: 16,
    borderRadius: 25,
    backgroundColor: '#21CEDB',
  },
  pinMaskError: {
    backgroundColor: '#D81010',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
});
