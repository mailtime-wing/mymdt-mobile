import styled from '@emotion/native';

import AppText from '@/components/AppText2';
import ScreenContainer from '@/components/ScreenContainer';
import withAttrs from '@/utils/withAttrs';

export const Container = styled(ScreenContainer)`
  flex: 1;
`;

export const SectionList = styled.SectionList`
  flex: 1;
  margin-bottom: 40px;
`;

export const Header = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 24px;
`;

export const Title = styled(withAttrs(AppText, {variant: 'pageTitle'}))`
  color: ${props => props.theme.colors.secondary.normal};
  margin-bottom: 24px;
`;

export const Description = styled(withAttrs(AppText, {variant: 'body1'}))`
  color: ${props => props.theme.colors.black.light};
`;

export const Section = styled.View`
  padding: 16px 24px;
`;

export const SectionText = styled(withAttrs(AppText, {variant: 'label'}))`
  color: ${props => props.theme.colors.black.superLight};
`;

export const Item = styled.TouchableOpacity`
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled(withAttrs(AppText, {variant: 'body1'}))`
  color: ${props => props.theme.colors.black.normal};
`;

export const CountryFlag = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 20px;
`;
