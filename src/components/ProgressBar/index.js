import React from 'react';
import {Platform, View} from 'react-native';
import {ProgressView as ProgressBarIOS} from '@react-native-community/progress-view';
import {ProgressBar as ProgressBarAndroid} from '@react-native-community/progress-bar-android';
import {
  container,
  detailRowContainer,
  progressBar,
  progressLabelContainer,
} from './style';
import {useTheme} from 'emotion-theming';

const ProgressBar = ({title, label, progressLabel, progress, style}) => {
  const theme = useTheme();
  return (
    <View style={[container, style]}>
      <View style={detailRowContainer}>
        {title}
        {label}
      </View>
      <View style={progressBar}>
        {Platform.OS === 'ios' ? (
          <ProgressBarIOS
            progress={progress}
            progressTintColor={theme.colors.secondary.normal}
            trackTintColor={theme.colors.black.extremeLight}
          />
        ) : (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            progress={progress}
            color={theme.colors.secondary.normal}
          />
        )}
      </View>
      <View style={progressLabelContainer}>{progressLabel}</View>
    </View>
  );
};

export default ProgressBar;
