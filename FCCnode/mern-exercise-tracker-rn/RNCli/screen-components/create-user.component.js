import React, { useState } from 'react';
import styles from '../constants/style';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Text,
  View,
} from 'react-native';

const Form = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create User</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const CreateUser = () => {
  return(
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name={'Create User'}
        component={Form}
        options={ ({navigation}) => ({
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