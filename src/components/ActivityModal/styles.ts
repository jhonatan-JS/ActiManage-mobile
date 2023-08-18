import { colors } from '@styles/global';
import styled from 'styled-components/native';

export const ModalContent = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const CardModal = styled.View`
  padding: 19px;
  margin: auto 12px;
  background-color: ${colors.white};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: auto;
  color: ${colors.black};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 22px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  margin-top: 12px;
  padding: 0 12px;
  border-radius: 2px;
  background-color: ${colors.backgroundInput};
`;

export const Button = styled.TouchableOpacity`
  width: 46%;
  height: 34px;
  background: ${colors.primary};

  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
`;
