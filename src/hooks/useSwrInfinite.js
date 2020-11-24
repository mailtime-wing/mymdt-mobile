import {useSWRInfinite} from 'swr';
import {AUTH_TOKENS} from '@/api/auth';
import {useQuery} from '@apollo/client';

const url = 'https://distribute-alpha.reward.me/cashback/histories';

const getKey = (pageIndex, previousPageData) => {
  // reached the end
  if (previousPageData && !previousPageData.data) {
    return null;
  }
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return `${url}?first=10`;
  }
  // add the cursor to the API endpoint
  return `${url}?after=${previousPageData.endCursor}&first=10`;
};

export default function useSwrInfinite() {
  const fetcher = (...args) =>
    fetch(...args, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    }).then((res) => res.json());

  const {data} = useSWRInfinite(getKey, fetcher);
  const {data: authData} = useQuery(AUTH_TOKENS);

  return {
    data: data,
  };
}
