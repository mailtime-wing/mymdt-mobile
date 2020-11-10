import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {
  progressTitleStyle,
  progressLabelStyle,
  progressContainer,
  rowContainer,
  button,
  finished,
  finishedContainer,
} from './style';
import AppText from '@/components/AppText2';
import ProgressBar from '@/components/ProgressBar';
import AppButton from '@/components/AppButton';
import CheckedIcon from '@/assets/icon_check-circle-2.svg';

const Requirement = ({task, target, progress, unit, action, actionText}) => {
  const theme = useTheme();
  const done = progress >= target;
  const doneColor = theme.colors.primary.normal; // finished use this color

  return (
    <View style={rowContainer}>
      <ProgressBar
        title={
          <AppText
            variant="subTitle3"
            style={[progressTitleStyle(theme), done && {color: doneColor}]}>
            {task}
          </AppText>
        }
        progressLabel={
          <AppText variant="smallText" style={progressLabelStyle(theme)}>
            {progress}/{target} {unit && unit}
          </AppText>
        }
        progress={progress / target}
        style={progressContainer}
        color={done ? doneColor : theme.colors.secondary.normal}
      />
      {done ? (
        <View style={finishedContainer}>
          <CheckedIcon stroke={doneColor} strokeWidth={2} />
          <AppText variant="subTitle3" style={finished(theme)}>
            Finished
          </AppText>
        </View>
      ) : (
        <AppButton
          onPress={action}
          variant="filled"
          sizeVariant="moreCompact"
          colorVariant="secondary"
          text={actionText}
          style={button}
        />
      )}
    </View>
  );
};

export default Requirement;
