import React from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';
import PhoneIcon from '@/assets/icon_smartphone.svg';
import ShieldIcon from '@/assets/icon_shield_big.svg';
import {Svg, Path} from 'react-native-svg';

import {
  layout,
  icons,
  circleBackground,
  iconShadow,
  dashDot,
  logoPosition,
  title as titleStyle,
  descriptionBoxContainer,
  descriptionLineContainer,
  descriptionLineTexts,
  descriptionLineTitle,
  descriptionLineCaption,
  descriptionLineSeparator,
  button,
} from './style';
import {FormattedMessage} from 'react-intl';

// create this SVG component because current <AppIcon /> do not support multi fill color
const Lock = () => {
  const theme = useTheme();
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8 11V5C8 2.79086 9.79086 1 12 1V1C14.2091 1 16 2.79086 16 5V11"
        fill="none"
        stroke-width="2"
        stroke={theme.colors.secondary.normal}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 11C4 9.34315 5.34315 8 7 8H17C18.6569 8 20 9.34315 20 11V21C20 22.6569 18.6569 24 17 24H7C5.34315 24 4 22.6569 4 21V11Z"
        fill={theme.colors.secondary.normal}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7007 11.2866C18.0947 11.6735 18.1004 12.3067 17.7134 12.7007L10.8384 19.7007C10.6504 19.8922 10.3933 20 10.125 20C9.85666 20 9.59958 19.8922 9.41155 19.7007L6.28655 16.5189C5.89956 16.1249 5.90527 15.4917 6.29929 15.1047C6.69332 14.7177 7.32646 14.7234 7.71345 15.1175L10.125 17.5729L16.2866 11.2993C16.6735 10.9053 17.3067 10.8996 17.7007 11.2866Z"
        fill={theme.colors.background1}
      />
    </Svg>
  );
};

const DescriptionLine = ({title, caption}) => {
  const theme = useTheme();

  return (
    <View style={descriptionLineContainer}>
      <Lock />
      <View style={descriptionLineTexts}>
        <AppText variant="heading5" style={descriptionLineTitle(theme)}>
          {title}
        </AppText>
        <AppText variant="body1" style={descriptionLineCaption(theme)}>
          {caption}
        </AppText>
      </View>
    </View>
  );
};

const Layout = ({logo, rightIcon, title, descriptions, onContinuePress}) => {
  const theme = useTheme();
  const backgroundColorRegexp = /(background-color:\s)(#.{6})/;
  const shieldColor = backgroundColorRegexp.exec(
    theme.colors.elevatedBackgroundMedium,
  )[2];

  return (
    <View style={layout}>
      <View style={icons}>
        <View
          style={[
            circleBackground,
            css`
              ${theme.colors.elevatedBackgroundMedium}
            `,
          ]}>
          <AppIcon
            sizeVariant="normal"
            color={theme.colors.secondary.normal}
            svgIcon={PhoneIcon}
          />
        </View>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={dashDot(theme)} />
        ))}
        <View>
          <ShieldIcon
            fill={shieldColor}
            style={[
              css`
                ${theme.colors.elevatedBackgroundMedium}
              `,
              iconShadow,
            ]}
          />
          <View
            style={[
              css`
                ${theme.colors.elevatedBackgroundMedium}
              `,
              logoPosition,
            ]}>
            {logo}
          </View>
        </View>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={dashDot(theme)} />
        ))}
        <View
          style={[
            circleBackground,
            css`
              ${theme.colors.elevatedBackgroundMedium}
            `,
          ]}>
          <AppIcon
            sizeVariant="normal"
            color={theme.colors.secondary.normal}
            svgIcon={rightIcon}
          />
        </View>
      </View>
      <AppText variant="heading3" style={titleStyle(theme)}>
        {title}
      </AppText>
      <View style={descriptionBoxContainer(theme)}>
        {descriptions.map((descriptionLine, i) => [
          <DescriptionLine
            key={descriptionLine.title}
            title={descriptionLine.title}
            caption={descriptionLine.caption}
          />,
          i < descriptions.length - 1 && (
            <View key={`separator-${i}`} style={descriptionLineSeparator} />
          ),
        ])}
      </View>
      <AppButton
        style={button}
        onPress={onContinuePress}
        text={
          <FormattedMessage id="button.continue" defaultMessage="Continue" />
        }
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
    </View>
  );
};

export default Layout;
