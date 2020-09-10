import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppModal from '@/components/AppModal';
import AppText from '@/components/AppText2';
import accountSubtypeEnum from '@/enum/accountSubtype';

import {
  modalHeader,
  modalHeading,
  closeImage,
  modalDescription,
  subtypeItemContainer,
  subtypeItemIcon,
  subtypeItemLabel,
  modalPadding,
} from './style';

import VisaIcon from '@/assets/icon_visa.svg';
import MasterIcon from '@/assets/icon_mastercard.svg';
import DiscoverIcon from '@/assets/icon_discover.svg';
import AEIcon from '@/assets/icon_ae.svg';

const SubtypeItem = ({label, icon: Icon, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={subtypeItemContainer} onPress={onPress}>
      <Icon style={subtypeItemIcon} />
      <AppText variant="body1" style={subtypeItemLabel(theme)}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const subtypes = [
  {
    value: accountSubtypeEnum.VISA,
    label: <FormattedMessage id="visa" defaultMessage="VISA" />,
    icon: VisaIcon,
  },
  {
    value: accountSubtypeEnum.MASTER,
    label: <FormattedMessage id="master" defaultMessage="Mastercard" />,
    icon: MasterIcon,
  },
  {
    value: accountSubtypeEnum.DISCOVER,
    label: <FormattedMessage id="discover" defaultMessage="Discover" />,
    icon: DiscoverIcon,
  },
  {
    value: accountSubtypeEnum.AE,
    label: <FormattedMessage id="ae" defaultMessage="American Express" />,
    icon: AEIcon,
  },
];

const ChooseSubtypeModal = ({mask, onSelect, onClosePress, ...props}) => {
  const theme = useTheme();
  return (
    <AppModal transparent modalBodyStyle={modalPadding} {...props}>
      <View style={modalHeader}>
        <AppText variant="heading3" style={modalHeading(theme)}>
          <FormattedMessage
            id="unknownCardType"
            defaultMessage="Unknown card type"
          />
        </AppText>
        <TouchableOpacity onPress={onClosePress}>
          <Image
            source={require('@/assets/icon_x.png')}
            style={closeImage(theme)}
          />
        </TouchableOpacity>
      </View>
      <AppText variant="body1" style={modalDescription(theme)}>
        <FormattedMessage
          id="selectCardTypeFor"
          defaultMessage="Select the card type for •••• {mask}"
          values={{
            mask,
          }}
        />
      </AppText>
      {subtypes.map(subtype => (
        <SubtypeItem
          key={subtype.value}
          label={subtype.label}
          icon={subtype.icon}
          onPress={() => {
            onSelect(subtype.value);
            onClosePress();
          }}
        />
      ))}
    </AppModal>
  );
};

ChooseSubtypeModal.defaultProps = {
  mask: '',
};

export default ChooseSubtypeModal;
