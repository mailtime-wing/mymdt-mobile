import React from 'react';
import {FormattedMessage} from 'react-intl';

import {MoreToComeText} from './style';

const NoMoreContent = () => (
  <MoreToComeText>
    <FormattedMessage
      id="more_to_come"
      defaultMessage="More to come. Stay tune."
    />
  </MoreToComeText>
);

export default NoMoreContent;
