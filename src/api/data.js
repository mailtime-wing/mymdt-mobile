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

export const UPDATE_USER_PROFILE_EDIT_API = gql`
  mutation UpdateUserProfile(
    $name: String!
    $gender: String!
    $dateOfBirth: Time!
  ) {
    updateUserProfile(name: $name, gender: $gender, dateOfBirth: $dateOfBirth)
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
      id
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
      name
      id
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
      basicOfferAvailableForEditAt
      currencyAccounts {
        id
        currencyCode
        balance
      }
    }
  }
`;

export const GET_USER_OFFER_API = gql`
  query {
    userProfile {
      id
      offers {
        id
        type
        brand {
          id
          name
          logo
        }
        name
        description
        cashbackRate
      }
    }
  }
`;

export const GET_USER_SETUP_STATUS_API = gql`
  query {
    userProfile {
      id
      setupStatus {
        isDataSourceBound
        isProfileCompleted
        isCashbackCurrencyCodeSet
        isBasicOfferSet
      }
    }
  }
`;

export const UPDATE_USER_CASHBACK_CURRENCY_CODE_API = gql`
  mutation UpdateUserCashbackCurrencyCode($code: CurrencyCode!) {
    updateUserCashbackCurrencyCode(code: $code)
  }
`;

export const GET_USER_REWARDS_API = gql`
  query {
    userProfile {
      id
      rewards {
        id
        name
        description
        value
        claimable
        claimed_time
        callback_url
        user_id
        status
        task_id
      }
    }
  }
`;

export const GET_APP_CONFIG_API = gql`
  query {
    appConfig {
      accountSetupTaskID
      inviteFriendTaskID
    }
  }
`;

export const GET_USER_PROFILE_API = gql`
  query {
    userProfile {
      id
      name
      gender
      birthday
      phoneNumber
    }
  }
`;

export const REPORT_MISSING_RECEIPT = gql`
  mutation reportMissingReceipt(
    $recipient: String!
    $subject: String!
    $sender: String!
    $emailDate: Time!
    $orderNumber: String
    $currencyCode: String
    $amount: Float
  ) {
    reportMissingReceipt(
      recipient: $recipient
      subject: $subject
      sender: $sender
      emailDate: $emailDate
      orderNumber: $orderNumber
      currencyCode: $currencyCode
      amount: $amount
    )
  }
`;

export const GET_USER_TASK_GROUPS_AND_REWARD_API = gql`
  query {
    userProfile {
      id
      taskGroups {
        id
        name
        description
        userTasks {
          taskId
          name
          description
          taskUrl
          maxCompletion
          maxAmountToEarn
          rewardValue
          tasksFinishedCount
          isTaskCompleted
        }
      }
      rewards {
        id
        name
        description
        value
        claimable
        callback_url
        claimed_time
        user_id
        task_id
        status
      }
    }
  }
`;

export const CLAIM_REWARD_API = gql`
  mutation ClaimReward($id: ID!) {
    claimReward(id: $id)
  }
`;

export const GET_CHECK_IN_STATUS_API = gql`
  query {
    userProfile {
      id
      checkInStatus {
        today
        hasCheckedInToday
        rewards
      }
      cashbackCurrencyCode
    }
  }
`;

export const CHECK_IN_API = gql`
  mutation CheckIn {
    checkIn
  }
`;

export const CURRENCY_CONVERT_API = gql`
  mutation Convert($amount: Float!, $from: CurrencyCode!, $to: CurrencyCode!) {
    convert(amount: $amount, from: $from, to: $to)
  }
`;

export const GET_CONVERSION_RATE_API = gql`
  query ConversionRate($from: CurrencyCode!, $to: CurrencyCode!) {
    conversionRate(from: $from, to: $to)
  }
`;

export const GET_CURRENCY_BALANCE_API = gql`
  query GetCurrecy($currencyCode: CurrencyCode) {
    userProfile {
      currencyAccounts(currencyCode: $currencyCode) {
        id
        currencyCode
        balance
      }
    }
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query GetCurrecy(
    $cursor: String
    $filter: TransactionFilter
    $currencyCode: CurrencyCode
  ) {
    userProfile {
      id
      locale
      currencyAccounts(currencyCode: $currencyCode) {
        id
        currencyCode
        balance
        transactions(first: 10, after: $cursor, filter: $filter) {
          edges {
            cursor
            node {
              id
              type
              transactionTime
              amount
              title
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`;

export const BIND_BANK_ITEM = gql`
  mutation BindBankItem(
    $syncServerItemId: String!
    $syncServerItemToken: String!
    $itemName: String!
    $accounts: [BankAccountInput!]!
  ) {
    bindBankItem(
      data: {
        syncServerItemId: $syncServerItemId
        syncServerItemToken: $syncServerItemToken
        itemName: $itemName
        accounts: $accounts
      }
    )
  }
`;

export const GET_BANK_ITEMS = gql`
  query {
    userProfile {
      id
      bankItems {
        id
        name
        bankAccounts {
          id
          accountName
          accountType
          accountSubtype
          isValid
          mask
        }
      }
    }
  }
`;

export const UPDATE_BANK_ACCOUNT_SUBTYPE = gql`
  mutation UpdateBankAccountSubtype($id: ID!, $subtype: BankAccountSubtype!) {
    updateBankAccountSubtype(id: $id, subtype: $subtype)
  }
`;

export const GET_USER_ID = gql`
  query {
    userProfile {
      id
    }
  }
`;
