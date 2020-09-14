import {useCallback, useContext, useReducer, useMemo} from 'react';
import {useMutation} from '@apollo/client';

import {AuthContext} from '@/context/auth';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').MutationHookOptions} MutationHookOptions
 * @typedef {import('@apollo/client').MutationTuple<any, any>} MutationTuple
 * @typedef {import('@apollo/react-common').MutationFunctionOptions<any, Record<string, any>>} MutationFunctionOptions
 */

/**
 *
 * @param {MutationHookOptions | MutationFunctionOptions} defaultOptions
 * @param {String} token
 */
const constructOptions = (defaultOptions, token) => {
  const {context, ..._options} = defaultOptions || {};
  const {headers, ..._context} = context || {};

  return {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        ...headers,
      },
      ..._context,
    },
    ..._options,
  };
};

const START_REQUEST = 'startRequest';
const SET_ERROR = 'setError';
const END_REQUEST = 'endRequest';

const reducer = (state, action) => {
  switch (action.type) {
    case START_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case END_REQUEST: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      throw new Error();
  }
};

const initialState = {
  loading: false,
  error: null,
};

/**
 *
 * @param  {DocumentNode} mutation
 * @param  {MutationHookOptions} options
 *
 * @returns {MutationTuple}
 */
export default function useMutationWithAuth(mutation, options = {}) {
  const {authToken, refreshAccessToken} = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [mutate, result] = useMutation(
    mutation,
    constructOptions(options, authToken),
  );

  /** @type {(options?: MutationFunctionOptions) => Promise<import('@apollo/react-common').ExecutionResult<any>>} */
  const _mutate = useCallback(
    async _options => {
      try {
        dispatch({type: START_REQUEST});
        const executionResult = await mutate(_options);
        return executionResult;
      } catch (e) {
        if (e.networkError?.statusCode !== 401) {
          dispatch({type: SET_ERROR, payload: e});
          throw e;
        }

        try {
          const newAccessToken = await refreshAccessToken();
          const executionResult = await mutate(
            constructOptions(_options, newAccessToken),
          );
          return executionResult;
        } catch (retryError) {
          dispatch({type: SET_ERROR, payload: retryError});
          // If any error is thrown, re-throw it and let caller controls how to handle
          throw retryError;
        }
      } finally {
        dispatch({type: END_REQUEST});
      }
    },
    [mutate, refreshAccessToken],
  );

  const _result = useMemo(() => {
    const {
      loading: originalLoading,
      error: orginalError,
      ...originalResult
    } = result;

    // Now the whole mutation process involve more than one individual request,
    // so we use internal loading and error state to track the progress
    return {
      loading: state.loading,
      error: state.error,
      ...originalResult,
    };
  }, [result, state]);

  return [_mutate, _result];
}
