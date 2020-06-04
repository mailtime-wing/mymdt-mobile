import styled from '@emotion/native';
import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';

export const Container = styled.View`
  flex: 1;
  margin-top: 47px;
  margin-bottom: 24px;
`;

export const ScrollContainer = styled.ScrollView`
  background: ${props => props.theme.colors.secondary.normal};
  padding-left: 24px;
  padding-right: 24px;
`;

export const BackgroundImage = styled.Image`
  align-self: center;
  margin-bottom: 85px;
`;

export const Title = styled(TitleText)`
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  color: ${props => props.theme.colors.white.normal};
  text-align: center;
  margin-bottom: 24px;
`;

export const Detail = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.white.normal};
  text-align: center;
  margin-bottom: 80px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
