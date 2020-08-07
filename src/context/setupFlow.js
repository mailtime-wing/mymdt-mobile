import React, {createContext, useContext, useState} from 'react';
import {Graph} from '@dagrejs/graphlib';

import {AuthContext} from '@/context/auth';
import {PreloadDataContext} from '@/context/preloadData';

const setupFlowContextInitialValue = {
  validScreenNames: {},
  graph: null,
};
export const SetupFlowContext = createContext(setupFlowContextInitialValue);

export const SetupFlowProvider = ({children}) => {
  const {notificationEnabled} = useContext(AuthContext);
  const {setupStatus} = useContext(PreloadDataContext);
  const [graph] = useState(new Graph());

  /**
   * A graph like below is set:
   *              |- email_flow -> D -> E -> F -|
   * A -> B -> C -|- card_flow -> G -> H -------|-> J -> K
   *              |- skip -> I -----------------|
   * where capital letter denotes a route name and the name
   * inside arrow denotes an flow name (If no name inside arrow,
   * it should be a 'next' flow)
   *
   * When navigate to a route, navigate functions should check if
   * it is valid. If not, it should find another route by following the
   * 'next' flow
   */
  graph.setDefaultEdgeLabel('next');
  graph.setPath(
    [
      'user_profile',
      'choose_cash_back_type',
      'welcome',
      'offer_select',
      'introduction',
    ],
    'next',
  );
  graph.setEdge('introduction', 'notification_permission', 'skip');
  graph.setEdge('introduction', 'add_email', 'email_flow');
  graph.setPath(
    ['add_email', 'linked_emails', 'notification_permission'],
    'next',
  );
  graph.setEdge('introduction', 'choose_region', 'card_flow');
  graph.setPath(
    [
      'choose_region',
      'data_source_info',
      'linked_cards',
      'notification_permission',
    ],
    'next',
  );
  graph.setPath(
    ['notification_permission', 'account_setup_done', 'sign_up_reward'],
    'next',
  );

  /** @type {Object.<string, boolean>} */
  const invalidScreenNames = {};
  if (setupStatus?.isProfileCompleted) {
    invalidScreenNames.user_profile = true;
  }
  if (setupStatus?.isCashbackCurrencyCodeSet) {
    invalidScreenNames.choose_cash_back_type = true;
  }
  if (setupStatus?.isBasicOfferSet) {
    invalidScreenNames.welcome = true;
    invalidScreenNames.offer_select = true;
  }
  if (setupStatus?.isDataSourceBound) {
    invalidScreenNames.introduction = true;
    invalidScreenNames.bind_email = true;
    invalidScreenNames.choose_region = true;
    invalidScreenNames.data_source_info = true;
    invalidScreenNames.linked_cards = true;
  }
  if (
    setupStatus?.isDataSourceBound &&
    setupStatus?.isCashbackCurrencyCodeSet &&
    setupStatus?.isBasicOfferSet
  ) {
    invalidScreenNames.account_setup_done = true;
    invalidScreenNames.sign_up_reward = true;
  }
  if (notificationEnabled) {
    invalidScreenNames.notification_permission = true;
  }

  /** @type {Object.<string, boolean>} */
  const validScreenNames = {};
  graph.nodes().forEach(nodeName => {
    if (!invalidScreenNames[nodeName]) {
      validScreenNames[nodeName] = true;
    }
  });

  return (
    <SetupFlowContext.Provider
      value={{
        validScreenNames,
        graph,
      }}>
      {children}
    </SetupFlowContext.Provider>
  );
};

export default SetupFlowProvider;
