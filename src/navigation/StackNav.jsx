import React from 'react';
import Home from '../screens/Home';
import Auth from '../screens/Auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Tab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default StackNav;
