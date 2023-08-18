import React, { useState, useEffect } from 'react';
import AddActivityForm from '@components/ActivityModal';
import { View, Button, FlatList, Alert } from 'react-native';
import {
  getAllActivities,
  addOrUpdateActivity,
  deleteActivity,
  getActivitiesBySemester,
  checkIfTableExists,
} from '@services/dbService';

import { Activity } from '@interface/index';
import { Text, colors } from '@styles/global';

import {
  Container,
  TitlePage,
  FilterContainer,
  Input,
  CardHeader,
  CardActivity,
  ContainerItemData,
  TitleData,
  DescriptionData,
  OrderButtons,
  ActionButton,
  ButtonText,
  Count,
} from './styles';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  const handleLoadActivitiesBySemester = async () => {
    if (selectedYear === '' && selectedSemester === '') {
      loadAllActivities();
      return;
    }

    try {
      const loadedActivities = await getActivitiesBySemester(
        selectedYear,
        selectedSemester,
      );
      setActivities(loadedActivities);
    } catch (error) {}
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSaveActivity = async (newActivity: Activity) => {
    try {
      const savedActivityId = await addOrUpdateActivity(newActivity);

      const updatedActivities = [...activities];
      if (editingActivity) {
        const index = updatedActivities.findIndex(
          activity => activity.id === savedActivityId,
        );
        if (index !== -1) {
          updatedActivities[index] = { ...newActivity, id: savedActivityId };
        }
      } else {
        updatedActivities.push({ ...newActivity, id: savedActivityId });
      }

      setActivities(updatedActivities);
      toggleModal();
      setEditingActivity(null);
    } catch (error) {
      Alert.alert('Error', 'Erro ao salvar atividade:, tente novamente.');
    }
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    toggleModal();
  };

  const handleDeleteActivity = async (activityId: number) => {
    try {
      await deleteActivity(activityId);
      const updatedActivities = activities.filter(
        activity => activity.id !== activityId,
      );
      setActivities(updatedActivities);
    } catch (error) {
      Alert.alert('Error', 'Erro ao excluir atividade:, tente novamente.');
    }
  };

  const getTotalHours = () => {
    return activities.reduce(
      (total, activity) => total + parseFloat(activity.time),
      0,
    );
  };

  const loadAllActivities = async () => {
    const tableExists = await checkIfTableExists();
    if (tableExists) {
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    }
  };

  useEffect(() => {
    loadAllActivities();
  }, []);

  useEffect(() => {
    if (selectedYear === '' && selectedSemester === '') {
      loadAllActivities();
    }
  }, [selectedYear, selectedSemester]);

  return (
    <Container>
      <View>
        {isModalVisible && (
          <AddActivityForm
            isOpen={isModalVisible}
            onSaveActivity={handleSaveActivity}
            onCancel={toggleModal}
            initialActivity={editingActivity}
          />
        )}
      </View>

      <TitlePage>{'Atividades'}</TitlePage>

      <Button
        color={colors.tertiary}
        title="Adicionar"
        onPress={() => {
          setEditingActivity(null);
          toggleModal();
        }}
      />
      <FilterContainer>
        <Text>{'Buscar Por Semestre'}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Ano"
            keyboardType="numeric"
            onChangeText={text => setSelectedYear(text)}
          />

          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Semestre"
            keyboardType="numeric"
            onChangeText={text => setSelectedSemester(text)}
          />

          <Button
            color={colors.tertiary}
            title="Buscar"
            onPress={handleLoadActivitiesBySemester}
          />
        </View>
      </FilterContainer>

      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <CardActivity key={index}>
            <CardHeader>
              <ContainerItemData>
                <TitleData>{'Titulo'}</TitleData>
                <DescriptionData>{item.title}</DescriptionData>
              </ContainerItemData>

              <ContainerItemData>
                <TitleData>{'Descrição'}</TitleData>
                <DescriptionData>{item.description}</DescriptionData>
              </ContainerItemData>
            </CardHeader>
            <CardHeader>
              <ContainerItemData>
                <TitleData>{'Data'}</TitleData>
                <DescriptionData>{item.date}</DescriptionData>
              </ContainerItemData>

              <ContainerItemData>
                <TitleData>{'Carga Horária'}</TitleData>
                <DescriptionData>{item.time}</DescriptionData>
              </ContainerItemData>
            </CardHeader>

            <OrderButtons>
              <ActionButton onPress={() => handleEditActivity(item)}>
                <ButtonText>{'Editar'}</ButtonText>
              </ActionButton>
              <ActionButton onPress={() => handleDeleteActivity(item.id)}>
                <ButtonText>{'Remover'}</ButtonText>
              </ActionButton>
            </OrderButtons>
          </CardActivity>
        )}
      />

      <Count>
        <Text>Total de Horas: {getTotalHours()} horas</Text>
      </Count>
    </Container>
  );
};

export default Home;
