import React from 'react';
import {Platform} from 'react-native';
import {ProgressView as ProgressBarIOS} from '@react-native-community/progress-view';
import {ProgressBar as ProgressBarAndroid} from '@react-native-community/progress-bar-android';
import {
  ProgressContainer,
  ProgressDetailContainer,
  ProgressHeader,
  ProgressNumber,
} from './style';
import {useTheme} from 'emotion-theming';

const ProgressBar = ({title, progressLabel, progress}) => {
  const theme = useTheme();
  return (
    <ProgressContainer>
      <ProgressDetailContainer>
        <ProgressHeader>{title}</ProgressHeader>
        <ProgressNumber>{progressLabel}</ProgressNumber>
      </ProgressDetailContainer>
      {Platform.OS === 'ios' ? (
        <ProgressBarIOS
          progress={progress}
          progressTintColor={theme.colors.black.normal}
          trackTintColor={theme.colors.grey.normal}
        />
      ) : (
        <ProgressBarAndroid
          progress={progress}
          color={theme.colors.black.normal}
        />
      )}
    </ProgressContainer>
  );
};

export default ProgressBar;
