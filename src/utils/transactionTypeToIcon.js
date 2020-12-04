import ConvertIcon from '@/assets/convert_icon.svg';
import LockIcon from '@/assets/icon_lock.svg';
import GiftIcon from '@/assets/gift_icon.svg';
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
      icon: ConvertIcon,
    },
    [TransactionsType.REWARD]: {
      icon: GiftIcon,
    },
  };
  return transactionsIconMap[type].icon;
}
