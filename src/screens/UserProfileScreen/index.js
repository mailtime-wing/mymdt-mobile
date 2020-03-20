import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {FormattedMessage, injectIntl} from 'react-intl';
import {css} from '@emotion/native';

import Input from '@/components/Input';
import Button from '@/components/Button';

import {
  Container,
  Title,
  Detail,
  GenderContainer,
  Gender,
  GenderText,
  DatePicker,
} from './style';

const genderOptions = [
  {label: 'Male', value: 'M'},
  {label: 'Female', value: 'F'},
  {label: 'N/A', value: 'N/A'},
];

const FormInput = props => (
  <View
    style={css`
      margin-bottom: 24px;
    `}>
    <Input {...props} />
  </View>
);

const GenderOption = ({label, value, setGender, gender}) => {
  const active = gender === value;
  return (
    <Gender active={active} onPress={() => setGender(value)}>
      <GenderText active={active}>{label}</GenderText>
    </Gender>
  );
};

const GenderSelector = ({gender, setGender}) => {
  return (
    <GenderContainer>
      {genderOptions.map(g => (
        <GenderOption
          label={g.label}
          value={g.value}
          setGender={setGender}
          gender={gender}
        />
      ))}
    </GenderContainer>
  );
};

const UserProfileScreen = ({route, navigation, intl}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(genderOptions[0].value);
  const [dob, setDob] = useState(new Date());
  const [referralCode, setReferralCode] = useState(null);
  const {phone, verificationCode, selectedBrands} = route.params;

  const onPressSpaceHandler = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  const onPressDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onPressNextHandler = () => {
    if (name === '' || gender === null) {
      Alert.alert('Please input all the required data');
    } else {
      const data = {
        phone: phone,
        verificationCode: verificationCode,
        name: name,
        gender: gender,
        dob: dob.toISOString(),
        selectedBrands: selectedBrands,
        referralCode: referralCode,
      };
      navigation.navigate('bind_email', data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => onPressSpaceHandler()}>
      <Container>
        <Title>
          <FormattedMessage id="let_us_know" />
        </Title>
        <Detail>
          <FormattedMessage id="we_hope_to_provide" />
        </Detail>
        <Detail
          style={css`
            margin-bottom: 48px;
          `}>
          * means required
        </Detail>
        <FormInput
          label={<FormattedMessage id="your_name" />}
          required
          onChangeText={text => setName(text)}
          value={name}
        />
        <GenderSelector gender={gender} setGender={setGender} />
        <TouchableOpacity onPress={() => onPressDatePickerHandler()}>
          <FormInput
            label={<FormattedMessage id="date_of_birth" />}
            required
            value={intl.formatDate(dob, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
            editable={false}
            remark={<FormattedMessage id="claim_gift_on_birthday" />}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={props => props.theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <FormInput
          label={<FormattedMessage id="referral_code" />}
          onChangeText={text => setReferralCode(text)}
          value={referralCode}
        />
        {showDatePicker && (
          <DatePicker
            mode="date"
            date={dob}
            onDateChange={setDob}
            maximumDate={new Date()}
          />
        )}
        <Button onPress={() => onPressNextHandler()}>
          <FormattedMessage id="next" />
        </Button>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default injectIntl(UserProfileScreen);
