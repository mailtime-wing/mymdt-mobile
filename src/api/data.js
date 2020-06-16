import {gql} from 'apollo-boost';

export const UPDATE_USER_PROFILE_API = gql`
  mutation UpdateUserProfile(
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
    $referralCode: String!
  ) {
    updateUserProfile(
      name: $name
      gender: $gender
      dateOfBirth: $dateOfBirth
      referralCode: $referralCode
    )
  }
`;

export const BIND_EMAIL_ACCOUNTS_API = gql`
  mutation BindEmailAccounts($email: String!, $token: String!) {
    bindEmailAccounts(data: {emailAddress: $email, token: $token}) {
      valids {
        id
        emailAddress
      }
      invalids
    }
  }
`;

export const UNBIND_EMAIL_ACCOUNTS_API = gql`
  mutation UnbindEmailAccounts($ids: [ID!]!) {
    unbindEmailAccounts(ids: $ids)
  }
`;

export const GET_USER_EMAIL_ACCOUNTS_API = gql`
  query {
    userProfile {
      emailAccounts {
        id
        emailAddress
      }
    }
  }
`;

export const GET_BASIC_OFFER_API = gql`
  query BasicOffers($locale: Locale!) {
    basicOffers(locale: $locale) {
      id
      type
      name
      description
      cashbackRate
      brand {
        id
        name
        logo
      }
    }
  }
`;

export const UPDATE_BASIC_OFFER_API = gql`
  mutation UpdateBasicOffers($ids: [ID!]!) {
    updateBasicOffers(ids: $ids)
  }
`;

export const GET_USER_MEMBERSHIP_API = gql`
  query {
    userProfile {
      membership {
        id
        name
        level
        inviteRequired
        mdtRequired
        brandsNumAllowed
        cashbackAdd
        interestRate
      }
    }
  }
`;

export const UPDATE_USER_CASHBACK_CURRENCY_CODE_API = gql`
  mutation UpdateUserCashbackCurrencyCode($code: CurrencyCode!) {
    updateUserCashbackCurrencyCode(code: $code)
  }
`;
