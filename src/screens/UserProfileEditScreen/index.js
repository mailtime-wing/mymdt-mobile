import React from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl';
import {
  Container,
  Title,
  UserIcon
} from './style';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow'

const data = [
 { label: 'Nickname' , value: <UserIcon source={require('@/assets/zt-mask.jpg')}/>},
 { label: 'Nickname' , value: 'Bob'},
 { label: 'Gender' , value: 'Male'},
 { label: 'Date of Bath' , value: <FormattedDate value={new Date()}/>},
 { label: 'Telephone' , value: '+86 9876 5432'},
]

const UserProfileEditScreen = () => {
  return (
    <ModalContaienr>
      <Container>
        <Title><FormattedMessage id='profile' /></Title>
          {data.map(d => 
            <ProfileDataRow label={d.label} value={d.value}/>
          )}
      </Container>
    </ModalContaienr>
  )
}

export default UserProfileEditScreen