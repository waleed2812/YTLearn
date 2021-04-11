import React, { useState } from 'react';
import styles from '../constants/style';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditExercises from './edit-exercise.component';

import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Stack = createStackNavigator();

const List = ({navigation}) => {

  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
        <Text style={styles.text}>Exercises List</Text>
      </TouchableOpacity>
    </View>
  );
};

const ExercisesList = () => {
  return(
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name={'List'}
        component={List}
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
      <Stack.Screen name={'Edit'} component={EditExercises}/>
    </Stack.Navigator>
  );
};

export default ExercisesList;