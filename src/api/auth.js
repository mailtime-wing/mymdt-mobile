import {gql} from 'apollo-boost';

export const GET_OTP_API = gql`
  mutation RequestOTPCode(
    $phoneNumber: String!
    $locale: String!
    $action: SMSOtpAction!
  ) {
    requestOTPCode(phoneNumber: $phoneNumber, locale: $locale, action: $action)
  }
`;

export const REGISTER_API = gql`
  mutation Register(
    $phoneNumber: String!
    $otp: String!
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
    $referalCode: String
    $subscribedBrandIds: [String!]
    $locale: String!
  ) {
    register(
      phoneNumber: $phoneNumber
      otp: $otp
      name: $name
      gender: $gender
      dateOfBirth: $dateOfBirth
      subscribedBrandIds: $subscribedBrandIds
      referalCode: $referalCode
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
      accessToken
      refreshToken
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
