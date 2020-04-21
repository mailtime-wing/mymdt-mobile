import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {IntlContext} from '@/context/Intl';

import ModalContaienr from '@/components/ModalContainer';

const LanguageOption = ({title, value, navigation}) => {
  const {saveLanguage} = useContext(IntlContext);
  const handleLanguagePress = () => {
    saveLanguage(value);
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={() => handleLanguagePress()}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const LanguageScreen = props => {
  const {languageList} = useContext(IntlContext);

  return (
    <ModalContaienr title={<FormattedMessage id="language" />}>
      <FlatList
        data={languageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <LanguageOption title={item.label} value={item.value} {...props} />
        )}
      />
    </ModalContaienr>
  );
};

export default LanguageScreen;
