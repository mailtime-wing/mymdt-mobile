import React, {useState} from 'react';
import {View, TouchableOpacity, SectionList} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';
import {Svg, Path, Rect} from 'react-native-svg';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import PopupModal from '@/components/PopupModal';
import AppTag from '@/components/AppTag';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_BANK_ITEMS,
  UPDATE_BANK_ACCOUNT_SUBTYPE,
  UNBIND_BANK_ITEM,
} from '@/api/data';
import accountSubtypeEnum from '@/enum/accountSubtype';
import VisaIcon from '@/assets/icon_visa.svg';
import MasterIcon from '@/assets/icon_mastercard.svg';
import DiscoverIcon from '@/assets/icon_discover.svg';
import AEIcon from '@/assets/icon_ae.svg';
import QuestionMarkIcon from '@/assets/icon_question_mark.svg';

import ChooseSubtypeModal from './ChooseSubtypeModal';

import {
  headerContainer,
  title,
  description,
  errorView,
  errorMessage,
  sectionContainer,
  sectionTitle,
  sectionRemoveButton,
  listItemContainer,
  listItemInfoContainer,
  accountName,
  accountNo,
  errorTag,
} from './style';

const UnknownCard = () => {
  const theme = useTheme();
  return (
    <Svg
      width="56"
      height="40"
      viewBox="0 0 48 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        width="48"
        height="34"
        rx="4"
        fill={theme.colors.unknownCard.background}
        fill-opacity="0.05"
      />
      <Path
        d="M22.5625 20.6733H25V20.5114C25.0341 18.5511 25.5966 17.6733 27.0455 16.7784C28.571 15.858 29.5085 14.5625 29.5085 12.6449C29.5085 9.875 27.4119 8 24.2841 8C21.4119 8 19.1108 9.67898 19 12.7472H21.5909C21.6932 10.9403 22.9801 10.1477 24.2841 10.1477C25.733 10.1477 26.9091 11.1108 26.9091 12.6193C26.9091 13.8892 26.1165 14.7841 25.1023 15.4148C23.517 16.3864 22.5795 17.3494 22.5625 20.5114V20.6733ZM23.8494 25.8551C24.7784 25.8551 25.554 25.0966 25.554 24.1506C25.554 23.2216 24.7784 22.4545 23.8494 22.4545C22.9119 22.4545 22.1449 23.2216 22.1449 24.1506C22.1449 25.0966 22.9119 25.8551 23.8494 25.8551Z"
        fill={theme.colors.unknownCard.color}
        fill-opacity="0.4"
      />
      <Rect
        x="0.5"
        y="0.5"
        width="47"
        height="33"
        rx="3.5"
        stroke={theme.colors.unknownCard.border}
        stroke-opacity="0.05"
      />
    </Svg>
  );
};

const componentToSubtypeMap = {
  [accountSubtypeEnum.UNKNOWN]: UnknownCard,
  [accountSubtypeEnum.VISA]: VisaIcon,
  [accountSubtypeEnum.MASTER]: MasterIcon,
  [accountSubtypeEnum.DISCOVER]: DiscoverIcon,
  [accountSubtypeEnum.AE]: AEIcon,
};

const ListHeader = ({anyUnknownCard}) => {
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
      {anyUnknownCard && (
        <View style={errorView(theme)}>
          <AppText variant="body2" style={errorMessage(theme)}>
            <FormattedMessage
              id="itMayTakeSomeTimeToAnalyze"
              defaultMessage="It may take some time to analyze your shopping e-receipts. We will notify you once it’s done."
            />
          </AppText>
        </View>
      )}
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
    const isUnknown =
      item.accountSubtype === accountSubtypeEnum.UNKNOWN ||
      !item.accountSubtype;

    const Icon = componentToSubtypeMap[item.accountSubtype] || UnknownCard;
    return (
      <TouchableOpacity
        style={listItemContainer}
        onPress={() => {
          setSelectedBankAccount(item);
          setShowChooseSubtypeModal((show) => !show);
        }}>
        <Icon width={56} height={40} />
        <View style={listItemInfoContainer}>
          <AppText variant="body1" style={accountName(theme)}>
            {`**** ${item.mask}`}
          </AppText>
          <AppText variant="caption" style={accountNo(theme)}>
            {isUnknown ? (
              <FormattedMessage id="unknown_click_to_select_card_type" />
            ) : (
              item.accountName
            )}
          </AppText>
        </View>
        {isUnknown && (
          <AppTag
            style={errorTag}
            variant="transparent"
            colorVariant="error"
            sizeVariant="normal"
            svgIcon={QuestionMarkIcon}
            text="Unknown Card"
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section: bankItem}) => (
    <View key={`${enableRemove}`} style={sectionContainer(theme)}>
      <AppText variant="subTitle2" style={sectionTitle(theme)}>
        {bankItem.name}
      </AppText>
      <AppButton
        variant="outlined"
        sizeVariant="compact"
        colorVariant="alert"
        onPress={() => setSelectedBankItem(bankItem)}
        text={<FormattedMessage id="button.remove" defaultMessage="remove" />}
        disabled={!enableRemove}
        style={sectionRemoveButton(enableRemove)}
      />
    </View>
  );

  /** @type Array<any> */
  const sections =
    data?.userProfile?.bankItems.map((item) => ({
      id: item.id,
      name: item.name,
      data: item.bankAccounts,
    })) || [];
  const anyUnknownCard = sections.some((section) =>
    section.data?.some(
      (bankAccount) =>
        bankAccount.accountSubtype === accountSubtypeEnum.UNKNOWN ||
        !bankAccount.accountSubtype,
    ),
  );

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <ListHeader anyUnknownCard={anyUnknownCard} />
        )}
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
          callback={async (mode) => {
            if (mode === 'OK') {
              try {
                await unbindBankItem({
                  variables: {
                    id: selectedBankItem.id,
                  },
                });

                updateQuery((prev) => {
                  const newData = JSON.parse(JSON.stringify(prev));
                  newData.userProfile.bankItems = newData.userProfile.bankItems.filter(
                    (bankItem) => bankItem.id !== selectedBankItem.id,
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
        onClosePress={() => setShowChooseSubtypeModal((show) => !show)}
        onSelect={async (subtype) => {
          try {
            await updateBankAccountSubtype({
              variables: {
                id: selectedBankAccount.id,
                subtype,
              },
            });

            updateQuery((prev) => {
              const newData = JSON.parse(JSON.stringify(prev));
              newData.userProfile.bankItems.some((bankItem) => {
                const bankAccount = bankItem.bankAccounts.find(
                  (account) => account.id === selectedBankAccount.id,
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
