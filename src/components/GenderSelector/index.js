import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {optionButton, genderStyle, labelStyle, optionsContainer} from './style';

import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

export const genderOptions = [
  {label: 'Male', value: 'M'},
  {label: 'Female', value: 'F'},
  {label: 'Others', value: 'Others'},
  {label: 'N/A', value: 'N/A'},
];

const GenderOption = ({label, value, setFieldValue, gender}) => {
  const theme = useTheme();
  const active = gender === value;
  return (
    <TouchableOpacity
      style={optionButton(theme, active)}
      onPress={() => setFieldValue('gender', value)}>
      <AppText variant="body2" style={genderStyle(theme, active)}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const GenderSelector = ({gender, setFieldValue, optionsContainerStyle}) => {
  const theme = useTheme();

  return (
    <View>
      <AppText variant="label" style={labelStyle(theme)}>
        <FormattedMessage id="gender" defaultMessage="gender" />*
      </AppText>
      <View style={[optionsContainer, optionsContainerStyle]}>
        {genderOptions.map(g => (
          <GenderOption
            key={g.value}
            label={g.label}
            value={g.value}
            setFieldValue={setFieldValue}
            gender={gender}
          />
        ))}
      </View>
    </View>
  );
};

export default GenderSelector;
