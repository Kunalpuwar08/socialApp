import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 2000);
  }, []);

  const getUser = async () => {
    const jsonValue = await AsyncStorage.getItem('isUser');
    jsonValue != null ? JSON.parse(jsonValue) : null;
    if (jsonValue == null) {
      navigation.replace('Auth');
    } else {
      navigation.replace('Tab');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
