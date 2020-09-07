import React, {createContext, useContext, useState, useMemo} from 'react';
import {Graph} from '@dagrejs/graphlib';

import {NotificationContext} from '@/context/notification';
import {PreloadDataContext} from '@/context/preloadData';

const setupFlowContextInitialValue = {
  validScreenNames: {},
  graph: null,
};
export const SetupFlowContext = createContext(setupFlowContextInitialValue);

export const SetupFlowProvider = ({children}) => {
  const {
    state: {permissions},
  } = useContext(NotificationContext);
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
  const invalidScreenNames = useMemo(() => {
    const result = {};
    if (setupStatus?.isProfileCompleted) {
      result.user_profile = true;
    }
    if (setupStatus?.isCashbackCurrencyCodeSet) {
      result.choose_cash_back_type = true;
    }
    if (setupStatus?.isBasicOfferSet) {
      result.welcome = true;
      result.offer_select = true;
    }
    if (setupStatus?.isDataSourceBound) {
      result.introduction = true;
      result.add_email = true;
      result.linked_emails = true;
      result.choose_region = true;
      result.data_source_info = true;
      result.linked_cards = true;
    }
    if (
      setupStatus?.isCashbackCurrencyCodeSet &&
      setupStatus?.isBasicOfferSet
    ) {
      result.account_setup_done = true;
      result.sign_up_reward = true;
    }
    if (permissions.alert) {
      result.notification_permission = true;
    }
    return result;
  }, [permissions, setupStatus]);

  /** @type {Object.<string, boolean>} */
  const validScreenNames = useMemo(() => {
    const result = {};
    graph.nodes().forEach(nodeName => {
      if (!invalidScreenNames[nodeName]) {
        result[nodeName] = true;
      }
    });
    return result;
  }, [graph, invalidScreenNames]);

  const setupFlowValue = useMemo(
    () => ({
      validScreenNames,
      graph,
    }),
    [graph, validScreenNames],
  );

  return (
    <SetupFlowContext.Provider value={setupFlowValue}>
      {children}
    </SetupFlowContext.Provider>
  );
};

export default SetupFlowProvider;
