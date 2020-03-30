import React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {Container, Text, UserIcon} from './style';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';

const data = [
  {
    label: 'Nickname',
    value: <UserIcon source={require('@/assets/zt-mask.jpg')} />,
  },
  {label: 'Nickname', value: <Text>Bob</Text>},
  {label: 'Gender', value: <Text>Male</Text>},
  {label: 'Date of Bath', value: <FormattedDate value={new Date()} />},
  {label: 'Telephone', value: <Text>+86 9876 5432</Text>},
];

const UserProfileEditScreen = () => {
  return (
    <ModalContaienr title={<FormattedMessage id="edit_profile" />}>
      <Container>
        {data.map(d => (
          <ProfileDataRow label={d.label} value={d.value} />
        ))}
      </Container>
    </ModalContaienr>
  );
};

export default UserProfileEditScreen;
