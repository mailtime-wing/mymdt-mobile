import React, {useState} from 'react';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Formik} from 'formik';

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
  FormInputContainer,
  Error,
  DateFieldContainer,
} from './style';

const genderOptions = [
  {label: 'Male', value: 'M'},
  {label: 'Female', value: 'F'},
  {label: 'N/A', value: 'N/A'},
];

const FormInput = props => (
  <FormInputContainer>
    <Input {...props} />
  </FormInputContainer>
);

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

const UserProfileScreen = ({route, navigation}) => {
  const intl = useIntl();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {phone, verificationCode, selectedBrands} = route.params;

  const handleSpacePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleNextPress = values => {
    const data = {
      phone: phone,
      verificationCode: verificationCode,
      name: values.name,
      gender: values.gender,
      dob: values.dob.toISOString(),
      selectedBrands: selectedBrands,
      referralCode: values.referralCode,
    };
    navigation.navigate('bind_email', data);
  };

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name Required';
    }
    if (!values.gender) {
      errors.gender = 'Gender Required';
    }
    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleSpacePress()}>
      <Container>
        <Title>
          <FormattedMessage id="let_us_know" />
        </Title>
        <Detail>
          <FormattedMessage id="we_hope_to_provide" />
        </Detail>
        <Detail>* means required</Detail>
        <Formik
          initialValues={{
            name: '',
            gender: genderOptions[0].value,
            dob: new Date(),
            referralCode: '',
          }}
          onSubmit={values => handleNextPress(values)}
          validate={values => validate(values)}>
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            isValid,
          }) => (
            <View>
              <FormInput
                label={<FormattedMessage id="your_name" />}
                required
                onChangeText={handleChange('name')}
                value={values.name}
                error={errors.name}
              />
              <GenderSelector
                gender={values.gender}
                setFieldValue={setFieldValue}
              />
              <Error>{errors.gender ? errors.gender : ' '}</Error>
              <DateFieldContainer onPress={() => handleDatePickerPress()}>
                <FormInput
                  label={<FormattedMessage id="date_of_birth" />}
                  required
                  value={intl.formatDate(values.dob, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                  editable={false}
                  remark={<FormattedMessage id="claim_gift_on_birthday" />}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={props => props.theme.colors.grey.dark}
                />
              </DateFieldContainer>
              <FormInput
                label={<FormattedMessage id="referral_code" />}
                onChangeText={handleChange('referralCode')}
                value={values.referralCode}
              />
              {showDatePicker && (
                <DatePicker
                  mode="date"
                  date={values.dob}
                  onDateChange={date => setFieldValue('dob', date)}
                  maximumDate={new Date()}
                />
              )}
              <Button onPress={handleSubmit} title="Submit" disabled={!isValid}>
                <FormattedMessage id="next" />
              </Button>
            </View>
          )}
        </Formik>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileScreen;
