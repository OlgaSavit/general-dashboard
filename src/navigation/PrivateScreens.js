import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// <-- SCREENS START -->
import HomeScreen from '../screens/Home';
import Settings from '../screens/Settings';
import LanguageScreen from '../screens/Settings/LanguageScreen';

// <-- SCREENS END -->

const Stack = createNativeStackNavigator();

const PrivateScreens = ({navigation}) => {
  const {routeName} = useSelector(state => state.global);

  return (
    <Stack.Navigator initialRouteName={routeName ?? 'HomeScreen'}>
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
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

export default PrivateScreens;
