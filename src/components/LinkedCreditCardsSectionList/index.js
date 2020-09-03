import React, {useState} from 'react';
import {View, TouchableOpacity, SectionList} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import PopupModal from '@/components/PopupModal';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_BANK_ITEMS,
  UPDATE_BANK_ACCOUNT_SUBTYPE,
  UNBIND_BANK_ITEM,
} from '@/api/data';
import accountSubtypeEnum from '@/enum/accountSubtype';
import UnknownCardLogo from '@/assets/icon_unknown_card.svg';
import VisaIcon from '@/assets/icon_visa.svg';
import MasterIcon from '@/assets/icon_mastercard.svg';
import DiscoverIcon from '@/assets/icon_discover.svg';
import AEIcon from '@/assets/icon_ae.svg';

import ChooseSubtypeModal from './ChooseSubtypeModal';

import {
  headerContainer,
  title,
  description,
  sectionContainer,
  sectionTitle,
  sectionRemoveButton,
  listItemContainer,
  listItemInfoContainer,
  accountName,
  accountNo,
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

/**
 * @typedef {import('react-native').SectionListProps} SectionListProps
 * @typedef {Object} BaseProps
 * @property {boolean} enableRemove
 *
 * @typedef {BaseProps & SectionListProps} Props
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const LinkedCreditCardsSectionList = ({enableRemove, ...props}) => {
  const theme = useTheme();
  const [showChooseSubtypeModal, setShowChooseSubtypeModal] = useState(false);
  const [selectedBankItem, setSelectedBankItem] = useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [fetchBankItems, {data, updateQuery}] = useLazyQueryWithAuth(
    GET_BANK_ITEMS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [updateBankAccountSubtype] = useMutationWithAuth(
    UPDATE_BANK_ACCOUNT_SUBTYPE,
  );
  const [unbindBankItem] = useMutationWithAuth(UNBIND_BANK_ITEM);
  // TODO: In settings flow, after user adds a card, it will navigate back to LinkedCardsSettingScreen which
  // requires refetching data for display. It may looks better to put this focus logic on the parent screen
  // component, but currently fetching logic is wrapped inside this compoent for share usage with LinkedCardsScreen.
  // So this has to be put here. Lets see if we can refactor this.
  useFocusEffect(fetchBankItems);

  const renderItem = ({item}) => {
    const Icon = componentToSubtypeMap[item.accountSubtype] || UnknownCardLogo;
    return (
      <TouchableOpacity
        style={listItemContainer}
        onPress={() => {
          setSelectedBankAccount(item);
          setShowChooseSubtypeModal(show => !show);
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

  const renderSectionHeader = ({section: bankItem}) => (
    <View key={`${enableRemove}`} style={sectionContainer(theme)}>
      <AppText variant="subTitle2" style={sectionTitle}>
        {bankItem.name}
      </AppText>
      <AppButton
        variant="outlined"
        sizeVariant="compact"
        colorVariant="alert"
        onPress={() => setSelectedBankItem(bankItem)}
        text={<FormattedMessage id="remove" defaultMessage="remove" />}
        disabled={!enableRemove}
        style={sectionRemoveButton(enableRemove)}
      />
    </View>
  );

  const sections =
    data?.userProfile?.bankItems.map(item => ({
      id: item.id,
      name: item.name,
      data: item.bankAccounts,
    })) || [];

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        {...props}
      />
      {!!selectedBankItem && (
        <PopupModal
          title={
            <FormattedMessage
              id="confirm_to_remove"
              defaultMessage="Confirm to remove {name}?"
              values={{
                name: selectedBankItem.name,
              }}
            />
          }
          detail={
            <FormattedMessage
              id="you_will_not_get_any_data_rewards_from"
              defaultMessage="You will not get any data rewards from {name}."
              values={{
                name: selectedBankItem.name,
              }}
            />
          }
          callback={async mode => {
            if (mode === 'OK') {
              try {
                await unbindBankItem({
                  variables: {
                    id: selectedBankItem.id,
                  },
                });

                updateQuery(prev => {
                  const newData = JSON.parse(JSON.stringify(prev));
                  newData.userProfile.bankItems = newData.userProfile.bankItems.filter(
                    bankItem => bankItem.id !== selectedBankItem.id,
                  );
                  return newData;
                });
                // TODO: handle error
              } catch (e) {}
            }
            setSelectedBankItem(null);
          }}
        />
      )}
      <ChooseSubtypeModal
        mask={selectedBankAccount?.mask}
        visible={showChooseSubtypeModal}
        onClosePress={() => setShowChooseSubtypeModal(show => !show)}
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
            // TODO: handle error
          } catch (e) {}
        }}
      />
    </>
  );
};

export default LinkedCreditCardsSectionList;
