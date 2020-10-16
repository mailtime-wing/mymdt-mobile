import React, {createContext, useEffect, useReducer} from 'react';
import branch from 'react-native-branch';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_ID} from '@/api/data';

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

  const {data: getUserIdData} = useQueryWithAuth(GET_USER_ID);
  const userId = getUserIdData?.userProfile?.id;
  const referralCode = 'F83R10'; // TODO: get from api

  useEffect(() => {
    const generate = async () => {
      try {
        branch.setIdentity(userId);
        const branchUniversalObject = await branch.createBranchUniversalObject(
          userId,
          {
            title: 'Cool Content!',
            contentDescription: 'Cool Content Description',
            contentMetadata: {
              ratingAverage: 4.2,
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
      } catch (error) {
        // TODO
      }
    };

    if (userId) {
      generate();
    }
  }, [userId]);

  useEffect(() => {
    branch.subscribe(({error, params, uri}) => {
      if (error) {
        console.error('Error from Branch: ' + error);
        return;
      }

      // params will never be null if error is null
      dispatch({
        type: UPDATE_REFERRING_PARAMS,
        payload: params,
      });
    });
  }, []);

  return (
    <BranchContext.Provider value={state}>{children}</BranchContext.Provider>
  );
};
