import styled from '@emotion/native';

export const Container = styled.View`
  padding-top: 43px;
  background-color: white;
`;

export const ContentContainer = styled.View`
  height: 100%;
`;

export const ButtonContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const ColorBackground = styled.View`
  color: ${props => props.backgroundColor};
  aspect-ratio: 1;
  border-radius: 24px;
`;

export const Header = styled.Text`
  font-size: 24px;
  margin-top: 40px;
  line-height: 31px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`;

export const Details = styled.Text`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const MarginContainer = styled.View`
  margin-top: 12px;
`;

export const SwiperContainer = styled.View`
  height: 590px;
`;
