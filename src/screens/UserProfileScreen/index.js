import React, {useState} from 'react';
import {
  View,
  Picker,
  DatePickerIOS,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {FormattedMessage, injectIntl} from 'react-intl';
import {css} from '@emotion/native';

import Input from '@/components/Input';
import Button from '@/components/Button';

import {Container, Title, Detail} from './style';

const FormInput = props => (
  <View
    style={css`
      margin-bottom: 24px;
    `}>
    <Input {...props} />
  </View>
);

const Gender = ({gender, setGender}) => {
  return (
    <Picker
      mode="dropdown"
      selectedValue={gender}
      onValueChange={item => setGender(item)}>
      <Picker.Item label="-" value={null} />
      <Picker.Item label="Male" value="M" />
      <Picker.Item label="Female" value="F" />
    </Picker>
  );
};

const UserProfileScreen = ({route, navigation, intl}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [referralCode, setReferralCode] = useState(null);
  const {phone, verificationCode, selectedBrands} = route.params;

  const onPressPickerHandler = () => {
    setShowPicker(!showPicker);
    setShowDatePicker(false);
  };

  const onPressDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker);
    setShowPicker(false);
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
      <TouchableOpacity onPress={() => onPressPickerHandler()}>
        <FormInput
          label={<FormattedMessage id="gender" />}
          required
          value={gender}
          editable={false}
        />
      </TouchableOpacity>
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
        style={css`
          margin-bottom: 46px;
        `}
      />
      {showPicker && <Gender gender={gender} setGender={setGender} />}
      {showDatePicker && (
        <DatePickerIOS mode="date" date={dob} onDateChange={setDob} />
      )}
      <Button onPress={() => onPressNextHandler()}>
        <FormattedMessage id="next" />
      </Button>
    </Container>
  );
};

export default injectIntl(UserProfileScreen);
