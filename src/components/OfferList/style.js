import styled, {css} from '@emotion/native';

export const OffersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-items: stretch;
`;

export const OfferContainer = styled.TouchableOpacity`
  width: 48%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  position: relative;
  border-radius: 16px;
  background-color: 'transparent';
  ${props =>
    props.selected
      ? `background-color: ${
          props.isError
            ? props.theme.colors.textOnError.normal
            : props.theme.colors.secondary.normal
        };`
      : 'background-color: transparent;'}
`;

export const StateContainer = styled.View`
  width: 20px;
  height: 20px;
  margin-top: 12px;
`;

export const Tick = styled.Image``;

export const CheckBox = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 2px solid ${props => props.theme.colors.contrastColor};
`;

export const OfferIcon = styled.Image`
  width: 80px;
  height: 80px;
`;

export const offerNameStyle = theme => css`
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const offerDiscountStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;
