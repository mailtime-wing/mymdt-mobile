import {StyleSheet} from 'react-native';
import styled from '@emotion/native';

import AppText from '@/components/AppText2';
import withAttrs from '@/utils/withAttrs';

export const Description = styled(withAttrs(AppText, {variant: 'body1'}))`
  color: ${(props) => props.theme.colors.textOnBackground.mediumEmphasis};
  margin-horizontal: 24px;
`;

export const Section = styled.View`
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.background1};
`;

export const SectionText = styled(withAttrs(AppText, {variant: 'label'}))`
  color: ${(props) => props.theme.colors.textOnBackground.disabled};
`;

export const Item = styled.TouchableOpacity`
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled(withAttrs(AppText, {variant: 'body1'}))`
  color: ${(props) => props.theme.colors.contrastColor};
`;

export const CountryFlag = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 20px;
`;

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 24,
  },
});
