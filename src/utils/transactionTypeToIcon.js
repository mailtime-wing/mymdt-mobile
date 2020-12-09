import ConvertIcon from '@/assets/convert_icon.svg';
import LockIcon from '@/assets/icon_lock.svg';
import GiftIcon from '@/assets/gift_icon.svg';
import CheckInIcon from '@/assets/check_in_Icon.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon.svg';
import BankIcon from '@/assets/icon_bank.svg';
import TransactionsType from '@/enum/transactionsType';

export default function transactionTypeToIcon(type) {
  const transactionsIconMap = {
    [TransactionsType.STAKING]: {
      icon: LockIcon,
    },
    [TransactionsType.CONVERSION]: {
      icon: ConvertIcon,
    },
    [TransactionsType.CHECK_IN]: {
      icon: CheckInIcon,
    },
    [TransactionsType.INTEREST]: {
      icon: DollarSignIcon,
    },
    [TransactionsType.REWARD]: {
      icon: GiftIcon,
    },
    [TransactionsType.REDEEM]: {
      icon: GiftIcon,
    },
    [TransactionsType.CASH_BACK]: {
      icon: DollarSignIcon,
    },
    [TransactionsType.BANK]: {
      icon: BankIcon,
    },
  };

  return transactionsIconMap[type].icon;
}
