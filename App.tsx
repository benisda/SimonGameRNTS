import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HighscoreScreen from './screens/HighscoreScreen';
import HomeScreen from './screens/HomeScreen';
import HightscoreProvider from './components/HighscoresContext';

export type RootStackParamList = {
  Home: undefined;
  Highscore: { score?: number };
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <HightscoreProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Highscore" component={HighscoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HightscoreProvider>
  );
}

export default App;