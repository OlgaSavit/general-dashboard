import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// <-- SCREENS START -->
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import LanguageScreen from '../screens/Settings/LanguageScreen';
// <-- SCREENS END -->

const Stack = createNativeStackNavigator();

const PublicScreens = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName={'StartScreen'}>
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Settings}
      />
      <Stack.Screen
        name="LanguageScreen"
        options={{headerShown: false}}
        component={LanguageScreen}
      />
    </Stack.Navigator>
  );
};

export default PublicScreens;
