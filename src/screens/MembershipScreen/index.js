import React from 'react';

import ModalContaienr from '@/components/ModalContainer';
import {FormattedMessage} from 'react-intl';

const MembershipScreen = () => (
  <ModalContaienr title={<FormattedMessage id="membership" />} />
);

export default MembershipScreen;
