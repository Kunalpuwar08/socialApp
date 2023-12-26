import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Api_url = 'http://10.0.2.2:8200:8200/socialapp/api';

const client = axios.create({
  baseURL: Api_url,
});

/**
 * Request Wrapper with default success/error actions
 */
const httpService = async options => {
  options.headers = {...options.headers};

  const onSuccess = response => {
    console.debug('Request Successful!', response);
    return response;
  };

  const onError = error => {
    console.log('Request Failed:', error.config);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

// const getHeader = async () => {
//   let a = await AsyncStorage.getItem('userLoggedIn');
//   let token = JSON.parse(a);
//   return {
//     Authorization: `${token}`,
//   };
// };

export default httpService;
