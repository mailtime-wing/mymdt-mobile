import React, {createContext, useEffect, useReducer} from 'react';
import branch from 'react-native-branch';
import {useIntl} from 'react-intl';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_REFERRAL_CODE} from '@/api/data';

const initialContextValue = {
  branchUniversalObject: null,
  referringParams: null,
};

export const BranchContext = createContext(initialContextValue);

const UPDATE_BRANCH_UNIVERSAL_OBJECT = 'updateBranchUniversalObject';
const UPDATE_REFERRING_PARAMS = 'updateReferringParams';
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BRANCH_UNIVERSAL_OBJECT:
      return {
        ...state,
        branchUniversalObject: action.payload,
      };
    case UPDATE_REFERRING_PARAMS:
      return {
        ...state,
        referringParams: action.payload,
      };
    default:
      break;
  }
};

export const BranchProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialContextValue);
  const intl = useIntl();

  const {data, error: requestError} = useQueryWithAuth(GET_USER_REFERRAL_CODE);
  const userId = data?.userProfile?.id;
  const referralCode = data?.userProfile?.referralCode;

  if (requestError) {
    // TODO: should we retry?
  }

  useEffect(() => {
    const generate = async () => {
      try {
        branch.setIdentity(userId);
        const branchUniversalObject = await branch.createBranchUniversalObject(
          userId,
          {
            title: intl.formatMessage({
              id: 'referralOgTitle',
            }),
            contentDescription: intl.formatMessage({
              id: 'referralOgDescription',
            }),
            contentImageUrl: 'https://files.reward.me/app_icon_180.png',
            contentMetadata: {
              customMetadata: {
                referralCode,
              },
            },
          },
        );
        dispatch({
          type: UPDATE_BRANCH_UNIVERSAL_OBJECT,
          payload: branchUniversalObject,
        });
      } catch {
        // TODO
      }
    };

    if (userId && referralCode && !state.branchUniversalObject) {
      generate();
    }
  }, [userId, referralCode, state.branchUniversalObject, intl]);

  useEffect(() => {
    if (userId) {
      branch.subscribe(({error, params, uri}) => {
        if (error) {
          // TODO: nothing we can do?
          return;
        }

        // ignore self-referring
        if (userId === params.$canonical_identifier) {
          return;
        }

        dispatch({
          type: UPDATE_REFERRING_PARAMS,
          payload: params,
        });
      });
    }
  }, [userId]);

  return (
    <BranchContext.Provider value={state}>{children}</BranchContext.Provider>
  );
};
