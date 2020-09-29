// reference:
// https://www.robinwieruch.de/react-hooks-fetch-data
// https://github.com/vercel/swr/blob/master/src/use-swr.ts
import {useState, useEffect, useReducer, useCallback, useRef} from 'react';

/**
 *
 * @param {{ isLoading: Boolean, isError: Boolean, data: any }} state
 * @param {{ type: String}} action
 */
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

/**
 *
 * @param {string} initialUrl
 * @param {{initialData: any, lazy: Boolean}} options
 *
 * @returns {[() => Promise<any>, { isLoading: Boolean, isError: Boolean, data: any }, () => void]}
 */
export default function useFetch(
  initialUrl,
  {initialFetchOptions = {}, initialData, lazy = false} = {},
) {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  const unmountedRef = useRef(false);

  const fetchData = useCallback(
    async (fetchOptions = {}) => {
      if (unmountedRef.current) {
        return;
      }

      dispatch({type: 'FETCH_INIT'});
      try {
        const result = await fetch(url, {
          ...initialFetchOptions,
          ...fetchOptions,
        });

        if (result.status < 200 || result.status > 399) {
          let errorMessage = '';
          try {
            errorMessage = await result.text();
          } catch {}
          throw new Error(errorMessage);
        }

        const contentType = result.headers.get('Content-Type');
        let data = null;
        // if Content-Type is application/json
        if (/application\/json/.test(contentType)) {
          data = await result.json();
        } else {
          // else, treat it as text/html
          data = await result.text();
        }

        if (unmountedRef.current) {
          return;
        }
        dispatch({type: 'FETCH_SUCCESS', payload: data});
        return data;
      } catch (error) {
        if (unmountedRef.current) {
          return;
        }
        dispatch({type: 'FETCH_FAILURE'});
        throw error;
      }
    },
    [initialFetchOptions, url],
  );

  useEffect(() => {
    unmountedRef.current = false;

    async function _fetchData() {
      try {
        await fetchData();
      } catch (e) {}
    }

    if (!lazy) {
      _fetchData();
    }

    return () => {
      unmountedRef.current = true;
    };
  }, [fetchData, lazy]);

  return [fetchData, state, setUrl];
}
