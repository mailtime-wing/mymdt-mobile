import React, {useContext, useState, useCallback} from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
import {GET_USER_OFFER_API, GET_USER_MEMBERSHIP_API} from '@/api/data';

import ModalContaienr from '@/components/ModalContainer';
import AppButton from '@/components/AppButton';
import OfferList from '@/components/OfferList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppText from '@/components/AppText2';

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

const OfferPreferenceEditScreen = ({navigation}) => {
  const theme = useTheme();
  const {authToken} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const apiContext = {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  };
  const {data, loading, refetch} = useQuery(GET_USER_OFFER_API, apiContext, {
    fetchPolicy: 'network-only',
  });
  const {data: userMembershipData, loading: userMembershipLoading} = useQuery(
    GET_USER_MEMBERSHIP_API,
    apiContext,
  );

  const numberOfOffer =
    userMembershipData?.userProfile?.membership?.brandsNumAllowed || 0;

  const canEditDate = new Date(
    userMembershipData?.userProfile?.basicOfferAvailableForEditAt,
  );
  const canEditPreference = new Date() >= canEditDate;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleEditPress = () => {
    if (canEditPreference) {
      navigation.navigate('offers_preference', {
        fromOfferPreferenceEditScreen: true,
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
      <ModalContaienr
        title={
          <FormattedMessage id="special_offer" defaultMessage="Special Offer" />
        }>
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
              {numberOfOffer} Brands
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
              text={<FormattedMessage id="edit" defaultMessage="edit" />}
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
            <OfferList offerList={data?.userProfile?.offers} />
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
                  date: (
                    <FormattedDate
                      value={canEditDate}
                      year="numeric"
                      month="long"
                      day="2-digit"
                    />
                  ),
                }}
              />
            }
            callback={() => setShowModal(false)}
          />
        )}
      </ModalContaienr>
    </ScrollContainer>
  );
};

export default OfferPreferenceEditScreen;
