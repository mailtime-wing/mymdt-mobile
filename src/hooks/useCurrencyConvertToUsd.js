import {useEffect, useMemo} from 'react';
import {GET_CONVERSION_RATE_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {USDT} from '@/constants/currency';

export default function useCurrencyConvertToUsd(fromCurrency) {
  const {data, refetch} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    variables: {
      from: fromCurrency,
      to: USDT,
    },
    skip: !fromCurrency,
  });

  useEffect(() => {
    if (fromCurrency) {
      refetch({
        variables: {from: fromCurrency, to: USDT},
      });
    }
  }, [fromCurrency, refetch]);

  const conversionRate = data?.conversionRate || 0;
  return useMemo(
    () => ({
      conversionRate,
    }),
    [conversionRate],
  );
}
