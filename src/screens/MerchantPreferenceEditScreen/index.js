import React, {useState, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';
import {GET_USER_MERCHANTS_API, GET_MERCHANT_AVAILABLE_AT} from '@/api/data';

import HeaderTitle from '@/components/HeaderTitle';
import AppButton from '@/components/AppButton';
import MerchantList from '@/components/MerchantList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppText from '@/components/AppText2';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import FormattedTransactionDate from '@/components/FormattedTransactionDate';

import {
  RowContainer,
  ScrollContainer,
  Container,
  Divider,
  headerDetailStyle,
  detailStyle,
  headerStyle,
  numberOfBrandStyle,
} from './style';
import {useTheme} from 'emotion-theming';

const MerchantPreferenceEditScreen = ({navigation}) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);

  const {data, loading, refetch} = useQueryWithAuth(GET_USER_MERCHANTS_API, {
    fetchPolicy: 'network-only',
  });
  const {
    data: userMembershipData,
    loading: userMembershipLoading,
  } = useQueryWithAuth(GET_MERCHANT_AVAILABLE_AT);

  const numberOfMerchant =
    userMembershipData?.userProfile?.membership?.merchantsNumAllowed || 0;

  const canEditDate = new Date(
    userMembershipData?.userProfile?.merchantAvailableForEditAt,
  );
  const canEditPreference = new Date() >= canEditDate;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleEditPress = () => {
    if (canEditPreference) {
      navigation.navigate('merchants_preference', {
        fromMerchantPreferenceEditScreen: true,
      });
    } else {
      setShowModal(true);
    }
  };

  if (userMembershipLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollContainer>
      <HeaderTitle>
        <FormattedMessage id="special_offer" defaultMessage="Special Offer" />
      </HeaderTitle>
      <Container>
        <AppText variant="body1" style={headerDetailStyle(theme)}>
          <FormattedMessage
            id="edit_preference_in_30_days"
            defaultMessage="You can edit your favorite brand preference once in 30 days. You will receive cashback based on your membership level."
          />
        </AppText>
        <RowContainer>
          <AppText variant="subTitle2" style={headerStyle(theme)}>
            <FormattedMessage
              id="max_choices"
              defaultMessage="Maximum choices"
            />
          </AppText>
          <AppText variant="body1" style={numberOfBrandStyle(theme)}>
            <FormattedMessage
              id="number_of_merchants"
              defaultMessage="{number} Merchants"
              values={{number: numberOfMerchant}}
            />
          </AppText>
        </RowContainer>
        <AppText variant="caption" style={detailStyle(theme)}>
          <FormattedMessage
            id="choose_more_brand_when_upgrade"
            defaultMessage="You can choose more brands when your membership is upgraded."
          />
        </AppText>

        <Divider />
        <RowContainer>
          <AppText variant="subTitle2" style={headerStyle(theme)}>
            <FormattedMessage id="your_choices" defaultMessage="Preference" />
          </AppText>
          <AppButton
            onPress={handleEditPress}
            text={<FormattedMessage id="button.edit" defaultMessage="edit" />}
            variant="filled"
            sizeVariant="compact"
            colorVariant="secondary"
          />
        </RowContainer>
        <AppText variant="caption" style={detailStyle(theme)}>
          <FormattedMessage
            id="get_reward_from_brands"
            defaultMessage="Choose your favorite brands with the special cashback rate."
          />
        </AppText>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MerchantList merchantList={data?.userProfile?.merchants} />
        )}
      </Container>
      {showModal && (
        <PopupModal
          title={
            <FormattedMessage
              id="edited_preference_recently"
              defaultMessage="It seems you’ve edited the preference recently."
            />
          }
          detail={
            <FormattedMessage
              id="edited_in_30_days"
              values={{
                date: <FormattedTransactionDate value={canEditDate} />,
              }}
            />
          }
          callback={() => setShowModal(false)}
        />
      )}
    </ScrollContainer>
  );
};

export default MerchantPreferenceEditScreen;
