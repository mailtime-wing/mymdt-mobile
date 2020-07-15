import React, {useContext, useState, useCallback} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
import {GET_USER_OFFER_API, GET_USER_MEMBERSHIP_API} from '@/api/data';

import ModalContaienr from '@/components/ModalContainer';
import ThemeButton from '@/components/ThemeButton';
import OfferList from '@/components/OfferList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';

import {
  Detail,
  HeaderDetail,
  Header,
  NumberOfBrand,
  RowContainer,
  ScrollContainer,
  Container,
  Divider,
} from './style';

const OfferPreferenceEditScreen = ({navigation}) => {
  const intl = useIntl();
  const {authToken} = useContext(AuthContext);
  const [canEdit] = useState(true); // TODO: integrate this once api ready
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleEditPress = () => {
    if (canEdit) {
      navigation.navigate('offers_preference_edit', {
        fromOfferPreference: true,
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
          <HeaderDetail>
            <FormattedMessage
              id="edit_preference_in_30_days"
              defaultMessage="You can edit your favorite brand preference once in 30 days. You will receive cashback based on your membership level."
            />
          </HeaderDetail>
          <RowContainer>
            <Header>
              <FormattedMessage
                id="max_choices"
                defaultMessage="Maximum choices"
              />
            </Header>
            <NumberOfBrand>{numberOfOffer} Brands</NumberOfBrand>
          </RowContainer>
          <Detail>
            <FormattedMessage
              id="choose_more_brand_when_upgrade"
              defaultMessage="You can choose more brands when your membership is upgraded."
            />
          </Detail>
          <Divider />
          <RowContainer>
            <Header>
              <FormattedMessage id="your_choices" defaultMessage="Preference" />
            </Header>
            <ThemeButton small onPress={handleEditPress}>
              <FormattedMessage id="edit" defaultMessage="edit" />
            </ThemeButton>
          </RowContainer>
          <Detail>
            <FormattedMessage
              id="get_reward_from_brands"
              defaultMessage="Choose your favorite brands with the special cashback rate."
            />
          </Detail>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <OfferList offerList={data?.userProfile?.offers} />
          )}
        </Container>
        {showModal && (
          <PopupModal
            detail={
              <FormattedMessage
                id="edited_in_30_days"
                values={{
                  date: intl.formatDate(new Date(), {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }),
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
