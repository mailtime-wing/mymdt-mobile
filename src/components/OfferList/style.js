import styled from '@emotion/native';
import Text from '@/components/AppText';

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

export const OfferName = styled(Text)`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const OfferDiscount = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
  text-align: center;
`;
