import React from 'react';

import {GenderContainer, Gender, GenderText} from './style';

export const genderOptions = [
  {label: 'Male', value: 'M'},
  {label: 'Female', value: 'F'},
  {label: 'N/A', value: 'N/A'},
];

const GenderOption = ({label, value, setFieldValue, gender}) => {
  const active = gender === value;
  return (
    <Gender active={active} onPress={() => setFieldValue('gender', value)}>
      <GenderText active={active}>{label}</GenderText>
    </Gender>
  );
};

const GenderSelector = ({gender, setFieldValue}) => {
  return (
    <GenderContainer>
      {genderOptions.map(g => (
        <GenderOption
          label={g.label}
          value={g.value}
          setFieldValue={setFieldValue}
          gender={gender}
        />
      ))}
    </GenderContainer>
  );
};

export default GenderSelector;
