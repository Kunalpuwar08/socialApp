import React from 'react';
import StackNav from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <StackNav />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
