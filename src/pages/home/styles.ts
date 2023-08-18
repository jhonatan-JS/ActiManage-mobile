import { colors } from '@styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 22px;
`;

export const CardActivity = styled.View`
  margin: 12px;
  padding: 12px;
  border-radius: 2px;
  border: 1px solid ${colors.border};
  background-color: ${colors.white};

  display: flex;
`;

export const FilterContainer = styled.View`
  width: 100%;
  margin: 22px 0;
  align-items: center;
  justify-content: space-around;
`;

export const Input = styled.TextInput`
  width: 100px;
  height: 36px;
  padding: 0 12px;
  border-radius: 2px;
  border: 1px solid ${colors.border};
  background-color: ${colors.backgroundInput};
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TitlePage = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: auto;
  color: ${colors.black};
  margin-bottom: 22px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.primary};
`;

export const ContainerItemData = styled.View`
  margin-bottom: 6px;
  width: 50%;
`;

export const TitleData = styled.Text`
  width: 100%;
  font-weight: bold;
  color: ${colors.secondary};
`;

export const DescriptionData = styled.Text`
  font-weight: 500;
  width: 100%;
  color: ${colors.black};
`;

export const OrderButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: space-around;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
`;

export const ActionButton = styled.TouchableOpacity`
  height: 36px;
  flex: 1;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 0 12px;
  border-radius: 2px;
  background-color: ${colors.primary};
`;

export const Count = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;

  margin: 12px 0;
`;
