import styled, {css} from '@emotion/native';

export const VerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 21px;
  margin-bottom: 37px;
`;

export const VerificationCodeContainer = styled.View`
  margin-right: 16px;
  flex: 1;
`;

export const termsStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 16px;
  padding: 0 24px;
  text-align: center;
`;

export const container = css`
  flex: 1;
`;

export const formView = css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const formBody = css`
  padding-horizontal: 24px;
`;

export const PhoneSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PhonePrefixContainer = styled.View`
  margin-right: 8px;
  flex: 1;
`;

export const PhoneContainer = styled.View`
  flex: 2;
`;

export const sendButtonContainer = css`
  width: auto;
`;
