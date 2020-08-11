import {useContext, useCallback} from 'react';
import {
  useRoute,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

import {SetupFlowContext} from '@/context/setupFlow';

export default function useSetupFlow() {
  const {graph, validScreenNames} = useContext(SetupFlowContext);
  const navigation = useNavigation();
  const navigationStateRoutes = useNavigationState(state => state.routes);
  const currentRoute = useRoute();

  const navigateByFlow = useCallback(
    (flow = 'next', ...args) => {
      function getTargetRouteName(nodeName, _flow) {
        if (graph.hasNode(nodeName)) {
          const outEdges = graph.outEdges(nodeName);
          if (outEdges) {
            const outEdgeLabelToWMap = {};
            outEdges.forEach(outEdge => {
              const edgeLabel = graph.edge(outEdge.v, outEdge.w);
              outEdgeLabelToWMap[edgeLabel] = outEdge.w;
            });

            const w = outEdgeLabelToWMap[_flow];
            if (w) {
              if (validScreenNames[w]) {
                return w;
              }

              return getTargetRouteName(w, 'next');
            }
          }
        }
      }

      const targetRouteName = getTargetRouteName(currentRoute.name, flow);
      navigation.navigate(targetRouteName || 'home', ...args);
    },
    [currentRoute.name, graph, navigation, validScreenNames],
  );

  const goBackTo = useCallback(
    routeName => {
      const previousRoute = navigationStateRoutes.find(
        route => route.name === routeName,
      );

      if (
        previousRoute &&
        graph.hasNode(routeName) &&
        validScreenNames[routeName]
      ) {
        navigation.navigate({key: previousRoute.key});
      }
    },
    [graph, navigation, navigationStateRoutes, validScreenNames],
  );

  return {navigateByFlow, goBackTo};
}
