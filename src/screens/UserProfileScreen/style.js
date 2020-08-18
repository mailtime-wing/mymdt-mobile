import styled, {css} from '@emotion/native';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  padding-left: 24px;
  padding-right: 24px;
`;

export const FormContainer = styled.View`
  margin-bottom: 16px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 29px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.black.light};
  margin-bottom: 24px;
`;

export const requiredText = theme => css`
  margin-bottom: 24px;
  margin-bottom: 24px;
  color: ${theme.colors.black.light};
`;

export const DateFieldContainer = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const GenderContainer = styled.View`
  height: 48px;
  width: 80%;
  border: 1px solid ${props => props.theme.colors.black.normal};
  flex-direction: row;
`;

export const Gender = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.colors.black.normal : 'transparent'};
`;

export const errorStyle = theme => css`
  color: ${theme.colors.error.light};
`;
