import React from 'react';
import ConvertIcon from '@/assets/convert_icon.svg';
import LockIcon from '@/assets/icon_lock.svg';
import UnlockIcon from '@/assets/icon_unlock.svg';
import GiftIcon from '@/assets/gift_icon.svg';
import CheckInIcon from '@/assets/check_in_Icon.svg';
import MdtIcon from '@/assets/mymdt_icon.svg';
import DepositIcon from '@/assets/icon_download.svg';
import WithdrawIcon from '@/assets/icon_upload.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon.svg';
import TransactionsType from '@/enum/transactionsType';
import {FormattedMessage} from 'react-intl';

export default function transactionTypeToIconAndName(type, amount) {
  const isAmountNegative = Math.sign(Number(amount)) === -1;

  const transactionsIconMap = {
    [TransactionsType.REWARD]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage id="transactionType.reward" defaultMessage="Reward" />
      ),
    },
    [TransactionsType.REDEEM]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage id="transactionType.redeem" defaultMessage="Redeem" />
      ),
    },
    [TransactionsType.CHECK_IN]: {
      icon: CheckInIcon,
      name: (
        <FormattedMessage
          id="transactionType.check_in"
          defaultMessage="Check In"
        />
      ),
    },
    [TransactionsType.EMAIL_DATA_POINT]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.cashback"
          defaultMessage="CASHBACK"
        />
      ),
    },
    [TransactionsType.BANK_DATA_POINT]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.cashback"
          defaultMessage="CASHBACK"
        />
      ),
    },
    [TransactionsType.CONVERSION]: {
      icon: ConvertIcon,
      name: (
        <FormattedMessage
          id="transactionType.conversion"
          defaultMessage="Converion"
        />
      ),
    },
    [TransactionsType.STAKING]: {
      icon: isAmountNegative ? LockIcon : UnlockIcon,
      name: isAmountNegative ? (
        <FormattedMessage id="transactionType.staking" defaultMessage="Stake" />
      ) : (
        <FormattedMessage
          id="transactionType.unstake"
          defaultMessage="Unstake"
        />
      ),
    },
    [TransactionsType.STAKING_PAYOUT]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.stake_payout"
          defaultMessage="Staking Payout"
        />
      ),
    },
    [TransactionsType.CASH_BACK]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.cashback"
          defaultMessage="CASHBACK"
        />
      ),
    },
    [TransactionsType.TRANSFER]: {
      icon: isAmountNegative ? WithdrawIcon : DepositIcon,
      name: isAmountNegative ? (
        <FormattedMessage
          id="transactionType.withdraw"
          defaultMessage="Withdraw"
        />
      ) : (
        <FormattedMessage
          id="transactionType.deposit"
          defaultMessage="Deposit"
        />
      ),
    },
    [TransactionsType.GIFT_CODE]: {
      icon: MdtIcon,
      name: (
        <FormattedMessage
          id="transactionType.gift_code"
          defaultMessage="Gift Code"
        />
      ),
    },
    [TransactionsType.INTEREST]: {
      icon: DollarSignIcon,
      name: (
        <FormattedMessage
          id="transactionType.interest"
          defaultMessage="Interest"
        />
      ),
    },
    [TransactionsType.MAI]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.cashback"
          defaultMessage="CASHBACK"
        />
      ),
    },
    [TransactionsType.BANK]: {
      icon: GiftIcon,
      name: (
        <FormattedMessage
          id="transactionType.cashback"
          defaultMessage="CASHBACK"
        />
      ),
    },
  };

  // for unhandled transationsType, default show deposit for positive amount/ withdraw for negative amount
  return {
    icon: transactionsIconMap[type]
      ? transactionsIconMap[type].icon
      : isAmountNegative
      ? WithdrawIcon
      : DepositIcon,
    name: transactionsIconMap[type] ? (
      transactionsIconMap[type].name
    ) : isAmountNegative ? (
      <FormattedMessage
        id="transactionType.withdraw"
        defaultMessage="Withdraw"
      />
    ) : (
      <FormattedMessage id="transactionType.deposit" defaultMessage="Deposit" />
    ),
  };
}
