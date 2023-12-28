import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfilePic from '../assets/images/profile.png';
const Profile = () => {
  const {data} = useSelector(state => state.user);

  const imgURL = data?.coverPic ? data?.coverPic : ProfilePic;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="infocirlceo" size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="setting" size={29} color={'black'} />
        </TouchableOpacity>
      </View>
      {/*  */}
      <View style={{alignSelf: 'center'}}>
        <Image
          source={imgURL}
          style={{height: 100, width: 100, borderRadius: 50}}
        />
        <Text style={styles.username}>{data?.username}</Text>
      </View>
      <View style={styles.numData}>
        <View>
          <Text style={{textAlign: 'center'}}>0</Text>
          <Text>Posts</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>{data?.followers.length}</Text>
          <Text>Followers</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>{data?.following.length}</Text>
          <Text>Following</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    padding: 12,
  },
  username: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  numData:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    alignSelf: 'center',
    padding: 12,
    borderBottomWidth:1
  }
});
