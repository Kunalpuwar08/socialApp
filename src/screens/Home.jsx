import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import httpService from '../utills';

const Api_url = 'http://10.0.2.2:8200/socialapp/api';

const Home = () => {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(`${Api_url}/post/get`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data, 'data =>>>>');
  }
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
