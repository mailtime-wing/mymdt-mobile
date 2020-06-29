import {useState, useRef, useCallback} from 'react';
import {useMutation} from '@apollo/react-hooks';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/react-hooks').MutationHookOptions} MutationHookOptions
 * @typedef {import('@apollo/react-common').MutationFunctionOptions} MutationFunctionOptions
 * @typedef {import('@apollo/react-common').ExecutionResult ExecutionResult}
 * @typedef {import('@apollo/react-common').MutationResult} MutationResult
 *
 * @param  {DocumentNode} mutation
 * @param  {MutationHookOptions=} options
 *
 * @returns {[(options?: MutationFunctionOptions) => Promise<ExecutionResult>, MutationResult, string]}
 */
export default function useMutationWithReset(mutation, options) {
  const [, setRenderToggle] = useState(false);
  const [mutate, result] = useMutation(mutation, options);
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
