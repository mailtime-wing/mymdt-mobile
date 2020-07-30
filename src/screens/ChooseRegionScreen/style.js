import styled from '@emotion/native';
import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  flex: 1;
`;

export const SectionList = styled.SectionList`
  flex: 1;
`;

export const Header = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 24px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  line-height: 36px;
  height: 36px;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary.normal};
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const Description = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.light};
`;

export const Section = styled.View`
  padding: 16px 24px;
`;

export const SectionText = styled(AppText)`
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  color: ${props => props.theme.colors.black.superLight};
`;

export const Item = styled.TouchableOpacity`
  padding: 16px 24px;
`;

export const ItemText = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.normal};
`;
