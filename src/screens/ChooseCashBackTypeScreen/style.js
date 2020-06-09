import styled from '@emotion/native';
import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';

export const Container = styled.View`
  flex: 1;
  padding-top: 76px;
`;

export const ScrollContainer = styled.ScrollView`
  background: ${props => props.theme.colors.secondary.normal};
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.white.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const Detail = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.white.normal};
  margin-bottom: 24px;
`;

export const BoxContainer = styled.View`
  background: ${props => props.theme.colors.white.normal};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const BoxLevel = styled(AppText)`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  line-height: 15px;
  color: ${props => props.theme.colors.secondary.normal};
  margin-bottom: 8px;
  text-align: center;
`;

export const BoxTitle = styled(TitleText)`
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
`;

export const BoxDetail = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.light};
  margin-bottom: 24px;
`;
