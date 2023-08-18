import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { initializeDatabase } from '@services/dbService';

import Home from '@pages/home';
import { colors } from '@styles/global';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();

    try {
      initializeDatabase();
    } catch (error) {
      console.error('Erro ao inicializar o banco de dados:', error);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.primary} />
      <Home />
    </GestureHandlerRootView>
  );
};

export default App;
