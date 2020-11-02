import React, {useState, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppButton from '@/components/AppButton';
import MerchantList from '@/components/MerchantList';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_MERCHANTS_API,
  GET_ALLOWED_MERCHANT_NUM,
  CHOOSE_MERCHANTS_API,
} from '@/api/data';

import {
  ScrollContainer,
  Container,
  FixedContainer,
  detailStyle,
  titleStyle,
  hightLightText,
  brandSelectedText,
} from './style';

const MerchantSelectScreen = ({route, navigation}) => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isErrorFromMerchantList, setIsErrorFromMerchantList] = useState(false);
  const {data, loading, error} = useQueryWithAuth(GET_MERCHANTS_API);
  const {
    data: allowedMerchantNum,
    loading: allowedMerchantNumLoading,
    error: allowedMerchantNumError,
  } = useQueryWithAuth(GET_ALLOWED_MERCHANT_NUM);
  const [chooseMerchantRequest] = useMutationWithAuth(CHOOSE_MERCHANTS_API);
  const numberOfMerchant =
    allowedMerchantNum &&
    allowedMerchantNum.userProfile.membership.merchantsNumAllowed;

  const formatOfferString = () => {
    const result = selectedMerchants
      .map((merchant) => merchant.name)
      .join(' and ');
    return result;
  };

  const handlePopupState = (state) => {
    if (state === 'OK') {
      handleSubmitMerchant();
    }
    setShowConfirmPopup(false);
  };

  const handleNextPress = () => {
    setShowConfirmPopup(true);
  };

  const handleError = useCallback((isError) => {
    setIsErrorFromMerchantList(isError);
  }, []);

  const handleSubmitMerchant = async () => {
    try {
      await chooseMerchantRequest({
        variables: {
          ids: selectedMerchants.map((selectedOffer) => selectedOffer.id),
        },
      });

      if (route?.params?.fromMerchantPreferenceEditScreen) {
        navigation.goBack();
        return;
      }

      navigateByFlow();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || allowedMerchantNumLoading) {
    return <LoadingSpinner />;
  }

  if (error || allowedMerchantNumError) {
    return (
      <PopupModal
        title="Error"
        detail="Please try again later"
        callback={navigation.goBack}
      />
    );
  }

  return (
    <Container>
      <ScrollContainer>
        <ScreenContainer hasTopBar>
          <AppText variant="pageTitle" style={titleStyle(theme)}>
            <FormattedMessage
              id="special_offer"
              defaultMessage="Special Offer"
            />
          </AppText>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage
              id="select_offer_details"
              defaultMessage="We also provide a special offer for everyone. You can choose your favorite or frequently spend brands. The cashback rate depends on your membership level."
            />
          </AppText>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage
              id="please_select_brands"
              defaultMessage="Please choose <FilterText>{number_of_merchants} brands/services</FilterText> to earn points with each time you spend there."
              values={{
                number_of_merchants: numberOfMerchant,
                FilterText: (str) => (
                  <AppText variant="body1" style={hightLightText(theme)}>
                    {str}
                  </AppText>
                ),
                // TOFIX: formatting not work in react native
              }}
            />
          </AppText>
          <MerchantList
            merchantList={data.merchants}
            selectedMerchants={selectedMerchants}
            setSelectedMerchants={setSelectedMerchants}
            merchantsLimit={numberOfMerchant}
            onError={handleError}
          />
        </ScreenContainer>
      </ScrollContainer>
      <FixedContainer>
        <AppText
          variant="label"
          style={brandSelectedText(theme, isErrorFromMerchantList)}>
          {isErrorFromMerchantList ? (
            <FormattedMessage
              id="more_merchants_selected"
              defaultMessage="MORE THAN {numberOfMerchant} {merchantCount, plural, =0 {merchant} one {merchant} other {merchants}} SELECTED"
              values={{
                numberOfMerchant: numberOfMerchant,
                merchantCount: selectedMerchants.length,
              }}
            />
          ) : (
            <FormattedMessage
              id="merchants_selected"
              defaultMessage="{numberOfMerchant} {merchantCount, plural, =0 {merchant} one {merchant} other {merchants}} SELECTED"
              values={{
                numberOfMerchant: selectedMerchants.length,
                merchantCount: selectedMerchants.length,
              }}
            />
          )}
        </AppText>
        <AppButton
          onPress={handleNextPress}
          disabled={isErrorFromMerchantList}
          text={
            <FormattedMessage id="button.confirm" defaultMessage="confirm" />
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
        />
      </FixedContainer>
      {!!showConfirmPopup && (
        <PopupModal
          title="Confirmation"
          detail={`You have chosen ${formatOfferString()} special offers. You can edit the preference in profile settings afterward.`}
          callback={handlePopupState}
        />
      )}
    </Container>
  );
};

export default MerchantSelectScreen;
