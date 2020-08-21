import React, {useState} from 'react';
import {View, TouchableOpacity, SectionList} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';

import ScreenContainer from '@/components/ScreenContainer';
import ThemeButton from '@/components/ThemeButton';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {GET_BANK_ITEMS, UPDATE_BANK_ACCOUNT_SUBTYPE} from '@/api/data';
import accountSubtypeEnum from '@/enum/accountSubtype';
import UnknownCardLogo from '@/assets/icon_unknown_card.svg';
import VisaIcon from '@/assets/icon_visa.svg';
import MasterIcon from '@/assets/icon_mastercard.svg';
import DiscoverIcon from '@/assets/icon_discover.svg';
import AEIcon from '@/assets/icon_ae.svg';

import ChooseSubtypeModal from './ChooseSubtypeModal';

import {
  headerContainer,
  footerContainer,
  title,
  description,
  sectionContainer,
  listItemContainer,
  listItemInfoContainer,
  accountName,
  accountNo,
  moreButton,
} from './style';

const componentToSubtypeMap = {
  [accountSubtypeEnum.UNKNOWN]: UnknownCardLogo,
  [accountSubtypeEnum.VISA]: VisaIcon,
  [accountSubtypeEnum.MASTER]: MasterIcon,
  [accountSubtypeEnum.DISCOVER]: DiscoverIcon,
  [accountSubtypeEnum.AE]: AEIcon,
};

const ListHeader = () => {
  const theme = useTheme();
  return (
    <View style={headerContainer}>
      <AppText variant="pageTitle" style={title(theme)}>
        <FormattedMessage
          id="linkedBankAccounts"
          defaultMessage="LINKED BANK ACCOUNTS"
        />
      </AppText>
      <AppText variant="body1" style={description(theme)}>
        <FormattedMessage
          id="itMayTakeSomeTimeToAnalyze"
          defaultMessage="It may take some time to analyze your shopping e-receipts. We will notify you once it’s done."
        />
      </AppText>
    </View>
  );
};

const ListFooter = ({onDonePress, onMorePress}) => (
  <View style={footerContainer}>
    <ThemeButton onPress={onDonePress}>
      <FormattedMessage id="done" defaultMessage="Done" />
    </ThemeButton>
    <ThemeButton buttonStyle={moreButton} reverse onPress={onMorePress}>
      <FormattedMessage id="connect_more" />
    </ThemeButton>
  </View>
);

const LinkCardsScreen = () => {
  const {navigateByFlow, goBackTo} = useSetupFlow();
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const {data, updateQuery} = useQueryWithAuth(GET_BANK_ITEMS);
  const [updateBankAccountSubtype] = useMutationWithAuth(
    UPDATE_BANK_ACCOUNT_SUBTYPE,
  );

  const renderItem = ({item}) => {
    const Icon = componentToSubtypeMap[item.accountSubtype] || UnknownCardLogo;
    return (
      <TouchableOpacity
        style={listItemContainer}
        onPress={() => {
          setSelectedBankAccount(item);
          setShowModal(show => !show);
        }}>
        <Icon width={56} height={40} />
        <View style={listItemInfoContainer}>
          <AppText variant="body1" style={accountName(theme)}>
            {`**** ${item.mask}`}
          </AppText>
          <AppText variant="caption" style={accountNo(theme)}>
            {item.accountName}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section: {name}}) => (
    <View style={sectionContainer(theme)}>
      <AppText variant="subTitle2">{name}</AppText>
    </View>
  );

  const sections =
    data?.userProfile?.bankItems.map(item => ({
      id: item.id,
      name: item.name,
      data: item.bankAccounts,
    })) || [];

  return (
    <ScreenContainer>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
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
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <ChooseSubtypeModal
        mask={selectedBankAccount?.mask}
        visible={showModal}
        onClosePress={() => setShowModal(show => !show)}
        onSelect={async subtype => {
          try {
            await updateBankAccountSubtype({
              variables: {
                id: selectedBankAccount.id,
                subtype,
              },
            });

            updateQuery(prev => {
              const newData = JSON.parse(JSON.stringify(prev));
              newData.userProfile.bankItems.some(bankItem => {
                const bankAccount = bankItem.bankAccounts.find(
                  account => account.id === selectedBankAccount.id,
                );
                if (bankAccount) {
                  bankAccount.accountSubtype = subtype;
                  return true;
                }

                return false;
              });
              return newData;
            });
          } catch (e) {}
        }}
      />
    </ScreenContainer>
  );
};

export default LinkCardsScreen;
