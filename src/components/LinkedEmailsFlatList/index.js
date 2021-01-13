import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';

import AppText from '@/components/AppText2';
import PopupModal from '@/components/PopupModal';
import HeaderTitle from '@/components/HeaderTitle';
import SpecialListOption from '@/components/SpecialListOption';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNT_API,
} from '@/api/data';

import {
  TitleContainer,
  titleText,
  itemContainer,
  unbindButton,
  removeText,
} from './style';

const ListHeader = () => {
  const theme = useTheme();
  return (
    <View>
      <HeaderTitle>
        <FormattedMessage id="linked_emails" defaultMessage="Linked Emails" />
      </HeaderTitle>
      <TitleContainer>
        <AppText variant="label" style={titleText(theme)}>
          <FormattedMessage id="email" defaultMessage="email" />
        </AppText>
      </TitleContainer>
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
const LinkedEmailsFlatList = ({enableRemove, isEditing, ...props}) => {
  const theme = useTheme();
  const [selectedEmailAccount, setSelectedEmailAccount] = useState(null);
  const [fetchEmailAccounts, {data, client}] = useLazyQueryWithAuth(
    GET_USER_EMAIL_ACCOUNTS_API,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [unbindEmailAccount] = useMutationWithAuth(UNBIND_EMAIL_ACCOUNT_API);
  // TODO: In settings flow, after user adds a card, it will navigate back to LinkedCardsSettingScreen which
  // requires refetching data for display. It may looks better to put this focus logic on the parent screen
  // component, but currently fetching logic is wrapped inside this compoent for share usage with LinkedCardsScreen.
  // So this has to be put here. Lets see if we can refactor this.
  useFocusEffect(fetchEmailAccounts);

  const renderItem = ({item}) => {
    return (
      <SpecialListOption
        style={itemContainer}
        label={<AppText variant="body1">{item.emailAddress}</AppText>}
        value={
          isEditing && (
            <TouchableOpacity
              style={unbindButton(theme)}
              onPress={() => setSelectedEmailAccount(item)}>
              <AppText variant="button" style={removeText(theme)}>
                <FormattedMessage id="button.unbind" defaultMessage="unbind" />
              </AppText>
            </TouchableOpacity>
          )
        }
      />
    );
  };

  /** @type Array<any> */
  const listData = data?.userProfile.emailAccounts || [];

  return (
    <>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={renderItem}
        {...props}
      />
      {!!selectedEmailAccount && (
        <PopupModal
          title={
            <FormattedMessage
              id="confirm_to_remove"
              defaultMessage="Confirm to remove {name}?"
              values={{
                name: selectedEmailAccount.emailAddress,
              }}
            />
          }
          detail={
            <FormattedMessage
              id="you_will_not_get_any_data_rewards_from"
              defaultMessage="You will not get any data rewards from {name}."
              values={{
                name: selectedEmailAccount.emailAddress,
              }}
            />
          }
          callback={async (mode) => {
            if (mode === 'OK') {
              try {
                await unbindEmailAccount({
                  variables: {
                    id: selectedEmailAccount.id,
                  },
                });

                client.cache.modify({
                  id: client.cache.identify(data.userProfile),
                  fields: {
                    emailAccounts(list, {readField}) {
                      return list.filter(
                        (n) => readField('id', n) !== selectedEmailAccount.id,
                      );
                    },
                  },
                });
                // TODO: handle error
              } catch (e) {}
            }
            setSelectedEmailAccount(null);
          }}
        />
      )}
    </>
  );
};

export default LinkedEmailsFlatList;
