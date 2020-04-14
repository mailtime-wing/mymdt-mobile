import React from 'react'

import {
  RowContainer,
  Label,
  Value,
} from './style';

const ProfileDataRow = ({ label, value }) =>
<RowContainer>
  <Label>
    {label}
  </Label>
  <Value>
    {value}
  </Value>
</RowContainer>

export default ProfileDataRow