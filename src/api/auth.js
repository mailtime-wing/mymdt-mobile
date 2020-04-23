import {gql} from 'apollo-boost';

export const GET_OTP_API = gql`
  mutation RequestOtpCode(
    $phoneNumber: String!
    $locale: Locale!
    $action: SMSOtpAction!
  ) {
    requestOtpCode(phoneNumber: $phoneNumber, locale: $locale, action: $action)
  }
`;

export const REGISTER_API = gql`
  mutation Register(
    $phoneNumber: String!
    $otp: String!
    $subscribedBrandIds: [String!]
    $locale: Locale!
  ) {
    register(
      phoneNumber: $phoneNumber
      otp: $otp
      subscribedBrandIds: $subscribedBrandIds
      locale: $locale
    ) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGIN_API = gql`
  mutation Login($phoneNumber: String!, $otp: String!) {
    login(phoneNumber: $phoneNumber, otp: $otp) {
      authToken {
        accessToken
        refreshToken
      }
      isEmailBound
      isProfileCompleted
    }
  }
`;

export const REFRESH_TOKEN_API = gql`
  mutation RefreshAuthToken($refreshToken: String!) {
    refreshAuthToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
