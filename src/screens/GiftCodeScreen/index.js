import React, {useReducer} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, View, Keyboard} from 'react-native';
import AppText from '@/components/AppText2';
import {
  image,
  title,
  container,
  linearGradient,
  safeAreaView,
  backgroundContainer,
} from './style';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {REDEEM_GIFT_CODE} from '@/api/auth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

import LoadingSpinner from '@/components/LoadingSpinner';
import LinearGradient from 'react-native-linear-gradient';

import GiftCodeForm from './GiftCodeForm';
import RedeemSuccess from './RedeemSuccess';
import RedeemFail from './RedeemFail';

const READY = 'ready';
const SUCCESS = 'success';
const FAIL = 'fail';

const initialState = {
  status: READY,
  redeemAmount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case FAIL: {
      return {
        ...state,
        status: FAIL,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        status: SUCCESS,
        redeemAmount: action.payload,
      };
    }
    case READY: {
      return initialState;
    }
    default:
      throw new Error();
  }
};

const GiftCodeScreen = ({navigation}) => {
  const theme = useTheme();
  const [redeemGiftCode, {loading}] = useMutationWithAuth(REDEEM_GIFT_CODE);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSubmitPress = async (values) => {
    try {
      const {data} = await redeemGiftCode({
        variables: {
          code: values.redeemCode,
        },
      });

      if (data) {
        dispatch({type: SUCCESS, payload: data.redeemGiftCode?.value || 0});
      }
    } catch (e) {
      console.error('Error in redeem gift code', e);
      dispatch({type: FAIL});
    }
    Keyboard.dismiss();
  };

  const handleConfirmPress = () => {
    navigation.pop();
  };

  const handleTryAgainPress = () => {
    dispatch({type: READY});
  };

  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={safeAreaView}>
      <View style={container}>
        <AppText variant="heading2" style={title(theme)}>
          <FormattedMessage id="mdt_gift_code" defaultMessage="MDT Gift Code" />
        </AppText>
        <Image
          source={require('@/assets/redeem-gift-code.png')}
          resizeMode="cover"
          style={image}
        />
        <View style={backgroundContainer}>
          <LinearGradient
            colors={theme.colors.linearGradientBackground.mdt_gift_code}
            style={linearGradient}
          />
        </View>
      </View>

      {loading && <LoadingSpinner />}
      {state.status === SUCCESS && (
        <RedeemSuccess
          onConfirmPress={handleConfirmPress}
          amount={state.redeemAmount}
        />
      )}
      {state.status === FAIL && (
        <RedeemFail onTryAgainPress={handleTryAgainPress} />
      )}
      {state.status === READY && (
        <GiftCodeForm onSubmitPress={handleSubmitPress} />
      )}
    </SafeAreaView>
  );
};

export default GiftCodeScreen;
