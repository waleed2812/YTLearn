import React, { useState } from 'react';
import styles from '../constants/style';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditExercises from './edit-exercise.component';

import axios from 'axios';

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const Stack = createStackNavigator();

const List = ({navigation}) => {

  const [exercises, setExercises] = useState([]);

  const renderItem = props => (
    <View key={item._id} style={styles.flatlistItem}>
      <View style={styles.flatlistItem}> 
        <Text style={styles.flatlistTxt}>{item.username}</Text> 
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {
        exercises.length === 0 ? <ActivityIndicator color='black' size='large' />:
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(item) => item._id?.toString()}
          extraData={{navigation}}
          style={styles.flatlistContainer}
        />
      }
    </SafeAreaView>
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