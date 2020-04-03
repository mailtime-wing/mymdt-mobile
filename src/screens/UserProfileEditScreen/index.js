import React, {useState} from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';
import ImagePicker from 'react-native-image-picker';
import {Container, Text, UserIcon} from './style';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';

const options = {
  title: 'CHANGE PROFILE PHOTO',
  customButtons: [{name: 'REMOVE', title: 'Remove Current Photo'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfileEditScreen = () => {
  const [profilePicture, setProfilePicture] = useState(
    require('@/assets/zt-mask.jpg'),
  );
  const handleCameraPress = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // handle cancel
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setProfilePicture(null);
      } else {
        const source = {uri: response.uri};
        if (source) {
          setProfilePicture(source);
        }
      }
    });
  };

  return (
    <ModalContaienr title={<FormattedMessage id="edit_profile" />}>
      <Container>
        <ProfileDataRow
          label={'Profile Picture'}
          value={<UserIcon source={profilePicture} />}
          onPress={() => handleCameraPress()}
        />
        <ProfileDataRow label={'Nickname'} value={<Text>Bob</Text>} />
        <ProfileDataRow label={'Gender'} value={<Text>Male</Text>} />
        <ProfileDataRow
          label={'Date of Bath'}
          value={<FormattedDate value={new Date()} />}
        />
        <ProfileDataRow
          label={'Telephone'}
          value={<Text>+86 9876 5432</Text>}
        />
      </Container>
    </ModalContaienr>
  );
};

export default UserProfileEditScreen;
