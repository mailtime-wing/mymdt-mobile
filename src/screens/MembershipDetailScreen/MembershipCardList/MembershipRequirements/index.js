import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';
import Requirements from '@/components/Requirements';

import {requirement, container, requirementSection} from './style';

const MembershipRequirements = (props) => {
  const theme = useTheme();

  return (
    <View style={[container(theme), requirementSection]}>
      <AppText variant="label" style={requirement(theme)}>
        <FormattedMessage id="requirements" defaultMessage="Requirements" />
      </AppText>
      <Requirements {...props} />
    </View>
  );
};

export default MembershipRequirements;
