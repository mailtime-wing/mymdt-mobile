import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';

import ScreenContainer from '@/components/ScreenContainer';
import TitleText from '@/components/TitleText';
import ThemeButton from '@/components/ThemeButton';
import AppText from '@/components/AppText';
import useSetupFlow from '@/hooks/useSetupFlow';
import UnknownCardLogo from '@/assets/icon_unknown_card.svg';

import {
  headerContainer,
  footerContainer,
  title,
  description,
  listHeading,
  listItemContainer,
  listItemInfoContainer,
  accountName,
  accountNo,
  moreButton,
} from './style';

const ListHeader = () => {
  const theme = useTheme();
  return (
    <View style={headerContainer}>
      <TitleText style={title(theme)}>LINKED cards</TitleText>
      <AppText style={description(theme)}>
        It may take some time to analyze your shopping e-receipts. We will
        notify you once it’s done.
      </AppText>
      <AppText style={listHeading(theme)}>Credit/Debit Cards</AppText>
    </View>
  );
};

const ListFooter = ({onDonePress, onMorePress}) => (
  <View style={footerContainer}>
    <ThemeButton onPress={onDonePress}>Done</ThemeButton>
    <ThemeButton buttonStyle={moreButton} reverse onPress={onMorePress}>
      Connect more
    </ThemeButton>
  </View>
);

const LinkCardsScreen = ({route, navigation}) => {
  const {navigateByFlow, goBackTo} = useSetupFlow();
  const theme = useTheme();

  const renderItem = ({item}) => (
    <TouchableOpacity style={listItemContainer}>
      <UnknownCardLogo />
      <View style={listItemInfoContainer}>
        <AppText style={accountName(theme)}>{item.accountName}</AppText>
        <AppText style={accountNo(theme)}>{`**** ${item.mask}`}</AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <FlatList
        ListHeaderComponent={ListHeader}
        ListFooterComponent={
          <ListFooter
            onDonePress={() => {
              navigateByFlow();
            }}
            onMorePress={() => {
              goBackTo('introduction');
            }}
          />
        }
        data={route.params.accountDetails}
        renderItem={renderItem}
        keyExtractor={({accountId}) => accountId}
      />
    </ScreenContainer>
  );
};

export default LinkCardsScreen;
