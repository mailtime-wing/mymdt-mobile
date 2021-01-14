import React, {useContext, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {useQuery} from '@apollo/client';

import {AuthContext} from '@/context/auth';
import PopupModal from '@/components/PopupModal';
import {AUTH_TOKENS} from '@/api/auth';

export default function RefreshTokenExpiredModal() {
  const {signOut} = useContext(AuthContext);
  const {data: authData = {}} = useQuery(AUTH_TOKENS);

  const handlePopupPress = useCallback(
    (pressed) => {
      if (pressed) {
        signOut();
      }
    },
    [signOut],
  );

  return (
    authData.isRefreshTokenExpired && (
      <PopupModal
        title={
          <FormattedMessage
            id="error.token_expired"
            defaultMessage="Token Expired"
          />
        }
        detail={
          <FormattedMessage
            id="please_login_again"
            defaultMessage="Please login again"
          />
        }
        callback={handlePopupPress}
      />
    )
  );
}
