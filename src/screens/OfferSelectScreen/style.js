import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const ScrollContainer = styled.ScrollView`
  padding-left: 24px;
  padding-right: 24px;
`;

export const Details = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.black.light};
  margin-bottom: 30px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const HightLightText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.secondary.normal};
`;

export const Container = styled.View`
  flex: 1;
`;

export const ViewContainer = styled.View`
  padding-top: 120px;
`;

export const FixedContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 110px;
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  border-color: rgba(0, 0, 0, 0.2);
  elevation: 1;
`;

export const BrandsSelectedText = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props =>
    props.isError
      ? props.theme.colors.error.dark
      : props.theme.colors.secondary.normal};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 40%;
  text-align: left;
`;
