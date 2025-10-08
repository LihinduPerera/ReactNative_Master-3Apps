import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDatabase } from '../hooks/useDatabase';
import TabNavigator from '../navigation/TabNavigator';

const App: React.FC = () => {
  useDatabase();

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;