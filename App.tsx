import React from 'react';
import StackNav from './src/navigation/StackNav';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNav />
          <Toast />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
