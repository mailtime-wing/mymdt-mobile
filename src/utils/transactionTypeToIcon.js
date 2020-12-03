import ConvertIcon from '@/assets/convert_icon.svg';
import LockIcon from '@/assets/icon_lock.svg';
import TransactionsType from '@/enum/transactionsType';

export default function transactionTypeToIcon(type) {
  const transactionsIconMap = {
    [TransactionsType.STAKING]: {
      icon: LockIcon,
    },
    [TransactionsType.CONVERSION]: {
      icon: ConvertIcon,
    },
  };
  return transactionsIconMap[type].icon;
}
