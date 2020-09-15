import {useState, useRef, useCallback} from 'react';
import {useMutation} from '@apollo/client';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').MutationHookOptions} MutationHookOptions
 * @typedef {import('@apollo/client').MutationFunctionOptions} MutationFunctionOptions
 * @typedef {import('@apollo/client').ExecutionResult ExecutionResult}
 * @typedef {import('@apollo/client').MutationResult} MutationResult
 *
 * @param  {DocumentNode} mutation
 * @param  {MutationHookOptions} options
 * @param  {{withAuth: Boolean}} config
 *
 * @returns {[(options?: MutationFunctionOptions) => Promise<ExecutionResult>, MutationResult, () => void]}
 */
export default function useMutationWithReset(
  mutation,
  options,
  {withAuth = false} = {},
) {
  const [, setRenderToggle] = useState(false);

  const _useMutation = withAuth ? useMutationWithAuth : useMutation;
  const [mutate, result] = _useMutation(mutation, options);

  const internalResult = useRef(result);
  const latestResult = useRef(result);
  const reset = useCallback(() => {
    internalResult.current = {};
    setRenderToggle(toggle => !toggle);
  }, []);

  if (!shallowEqual(result, latestResult.current)) {
    internalResult.current = result;
    latestResult.current = result;
  }

  return [mutate, internalResult.current, reset];
}
