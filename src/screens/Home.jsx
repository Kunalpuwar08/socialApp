import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {baseURL} from '../constant';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {data} = useSelector(state => state.user);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(`${baseURL}/post/get`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    setPosts(res?.data);
  }

  const likeUnlike = async id => {
    try {
      const response = await fetch(`${baseURL}/post/like/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: data._id}),
      });
      const res = await response.json();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderCard = ({item, index}) => {
    return (
      <View style={styles.card}>
        <Text
          style={[
            styles.caption,
            {textDecorationLine: 'underline', marginBottom: 9},
          ]}>
          {item.username}
        </Text>

        <Text style={styles.caption} numberOfLines={5}>
          {item.caption}
        </Text>

        <View style={styles.bottomBtn}>
          <TouchableOpacity onPress={() => likeUnlike(item._id)}>
            <AntDesign
              name={
                item.likes && item.likes.includes(data?._id)
                  ? 'heart'
                  : 'hearto'
              }
              size={22}
              color={
                item.likes && item.likes.includes(data?._id) ? 'red' : 'black'
              }
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Fontisto name={'comment'} size={22} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto name={'share-a'} size={22} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>ChitChat</Text>
      </View>
      <FlatList data={posts} renderItem={renderCard} />
      <TouchableOpacity style={styles.floatBtn}>
        <AntDesign name="plus" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    width: '90%',
    alignSelf: 'center',
    marginTop: 8,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    height: 'auto',
    minHeight: 100,
    backgroundColor: 'white',
    elevation: 6,
    marginVertical: 12,
    borderRadius: 8,
    padding: 8,
  },
  caption: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 16,
  },
  bottomBtn: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    height: 'auto',
  },
  floatBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
  },
});
