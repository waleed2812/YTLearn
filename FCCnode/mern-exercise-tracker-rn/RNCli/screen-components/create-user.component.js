import React, { useState } from 'react';
import styles from '../constants/style';
import axios from 'axios';

import {
  Text,
  TextInput,
  View,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const User = ({navigation}) => {

  const [username, setUsername] = useState('');

  const onSubmit = () => {
    const user = {
      username: username
    }

    axios.post('http://192.168.1.73:5000/users/add', user)
      .then(() => navigation.navigate('Excercises'))
      .catch(err => console.error(err));

  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Username: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}
          value={username}
          placeholder="Enter Username"
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.button_text}>Submit</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

const Stack = createStackNavigator();

const CreateUser = () => {

  return(
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name={'User'}
        component={User}
        options={ ({navigation}) => ({

          title: 'Exercise Tracker',

          headerLeft: () => (
            <Icon 
              name="bars" 
              size={30} 
              color="black"
              style={{ paddingLeft: 10 }}
              onPress={navigation.toggleDrawer}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default CreateUser;