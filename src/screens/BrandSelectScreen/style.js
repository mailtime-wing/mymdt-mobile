import styled from '@emotion/native';
import Text from '@/components/AppText';

export const ScrollContainer = styled.ScrollView`
  margin-top: 100px;
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

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
  font-family: 'Neo Sans Pro';
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

export const FixedContainer = styled.View`
  height: 153px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const BrandsSelectedText = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondary.normal};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;
