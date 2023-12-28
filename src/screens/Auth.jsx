import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { updateData } from '../redux/userSlice';
import { baseURL } from '../constant';

const Auth = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const onSwitchPress = value => {
    setActiveIndex(value);
  };

  const onLogin = async () => {
    const {email, password} = formData;
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data) {
      Toast.show({
        type: data.status == true ? 'success' : 'error',
        text2: data?.message,
      });

      if (data.status == true) {
        setTimeout(async () => {
          await AsyncStorage.setItem('isUser', JSON.stringify(data.data));
          dispatch(updateData(data.data));
          navigation.navigate('Tab');
        }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              {borderBottomWidth: activeIndex == 0 ? 1 : 0},
            ]}
            onPress={() => onSwitchPress(0)}>
            <Text style={styles.switchBtnTxt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchBtn,
              {
                borderBottomWidth: activeIndex == 1 ? 1 : 0,
              },
            ]}
            onPress={() => onSwitchPress(1)}>
            <Text style={styles.switchBtnTxt}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 12}}>
          {activeIndex == 0 ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Your email"
                onChangeText={text => handleInputChange('email', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Your password"
                onChangeText={text => handleInputChange('password', text)}
              />
              <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text style={styles.loginBtnTxt}>Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput style={styles.input} placeholder="username" />
              <TextInput style={styles.input} placeholder="email" />
              <TextInput style={styles.input} placeholder="mobile" />
              <TextInput style={styles.input} placeholder="password" />
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginBtnTxt}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: 'auto',
    width: '90%',
    backgroundColor: 'white',
    elevation: 6,
    padding: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchBtn: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBtnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 9,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
  loginBtn: {
    width: '90%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 9,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
