import React, { useState } from 'react';
import { Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import {
  ModalContent,
  CardModal,
  Title,
  ButtonContainer,
  Button,
  ButtonText,
  Input,
} from './styles';

interface Activity {
  title: string;
  description: string;
  date: string;
  time: string;
}

interface AddActivityProps {
  onSaveActivity: (activity: Activity) => void;
  onCancel: () => void;
  isOpen: boolean;
  initialActivity?: Activity;
}

const AddActivity = ({
  onSaveActivity,
  onCancel,
  isOpen,
  initialActivity,
}: AddActivityProps) => {
  const [activity, setActivity] = useState<Activity>({
    title: '',
    description: '',
    date: '',
    time: '',
    ...initialActivity,
  });

  const handleSaveActivity = () => {
    if (
      !activity.title ||
      !activity.description ||
      !activity.date ||
      !activity.time
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(activity.date)) {
      Alert.alert(
        'Erro',
        'Formato de data inválido. Use o formato dd/mm/yyyy.',
      );
      return;
    }
    onSaveActivity(activity);
  };

  return (
    <Modal
      transparent={true}
      visible={isOpen}
      animationType="slide"
      statusBarTranslucent={true}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
          <ModalContent>
            <CardModal>
              <Title>{'Nova Atividade'}</Title>
              <Input
                placeholder="Título"
                value={activity.title}
                onChangeText={text => setActivity({ ...activity, title: text })}
              />
              <Input
                placeholder="Descrição"
                value={activity.description}
                onChangeText={text =>
                  setActivity({ ...activity, description: text })
                }
              />
              <Input
                placeholder="dd/mm/yyyy"
                value={activity.date}
                onChangeText={text => setActivity({ ...activity, date: text })}
              />
              <Input
                placeholder="Hora"
                value={activity.time}
                onChangeText={text => setActivity({ ...activity, time: text })}
              />
              <ButtonContainer>
                <Button onPress={onCancel}>
                  <ButtonText>{'Cancelar'}</ButtonText>
                </Button>
                <Button onPress={handleSaveActivity}>
                  <ButtonText>{'Salvar Atividade'}</ButtonText>
                </Button>
              </ButtonContainer>
            </CardModal>
          </ModalContent>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddActivity;
