import React from 'react';

import ChooseCashBackType from '@/components/ChooseCashBackType';
import useSetupFlow from '@/hooks/useSetupFlow';

const ChooseCashBackTypeScreen = () => {
  const {navigateByFlow} = useSetupFlow();

  return <ChooseCashBackType onChoose={() => navigateByFlow()} />;
};

export default ChooseCashBackTypeScreen;
