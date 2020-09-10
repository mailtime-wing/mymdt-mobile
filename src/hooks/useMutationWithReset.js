import {useState, useRef, useCallback} from 'react';
import {useMutation} from '@apollo/react-hooks';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/react-hooks').MutationHookOptions} MutationHookOptions
 * @typedef {import('@apollo/react-common').MutationFunctionOptions} MutationFunctionOptions
 * @typedef {import('@apollo/react-common').ExecutionResult ExecutionResult}
 * @typedef {import('@apollo/react-common').MutationResult} MutationResult
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

  if (result !== latestResult.current) {
    internalResult.current = result;
    latestResult.current = result;
  }

  return [mutate, internalResult.current, reset];
}
