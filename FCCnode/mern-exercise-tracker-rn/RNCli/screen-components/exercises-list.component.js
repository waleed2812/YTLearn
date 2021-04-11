import React, { useState } from 'react';
import styles from '../constants/style';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditExercises from './edit-exercise.component';

import axios from 'axios';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const List = ({navigation}) => {

  const [exercises, setExercises] = useState([]);
  const [first, setFirst] = useState(true);



  React.useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <Icon 
          name="refresh" 
          size={30} 
          color="black"
          style={{ paddingRight: 10 }}
          onPress={() => setFirst(true)}
        />
      ),
    });

    if (first){
      axios.get('http://192.168.1.73:5000/exercises/')
        .then(response => {
          setExercises(response.data);
          setFirst(false);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  });

  const deleteExercise = (id) => {
    axios.delete('http://192.168.1.73:5000/exercises/'+id)
      .then(response => {  
        setExercises(exercises.filter(el => el._id !== id));
      })
      .catch(err => console.error(err));
  }

  const editExercise = (id) => {
    navigation.navigate('Edit', {id});
  }

  const renderItem = ({item}) => {
    return (
      <View key={item._id} style={styles.flatlistItemContainer}>
        <View style={styles.flatlistItem}> 
          <Text style={styles.flatlistTxt}>{item.username}</Text>
          <Text style={styles.flatlistTxt}>{item.description}</Text>
          <Text style={styles.flatlistTxt}>{item.duration}</Text>
          <Text style={styles.flatlistTxt}>{item.date.substring(0,10)}</Text>
          <View style={styles.flatlistAction}>
            <TouchableOpacity onPress={editExercise.bind(this, item._id)}>
              <Text style={styles.flatlistAnchor}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.flatlistTxt}>|</Text>
            <TouchableOpacity onPress={deleteExercise.bind(this, item._id)}>
              <Text style={styles.flatlistAnchor}>Delete</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        first ? <ActivityIndicator color='black' size='large' />:
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

const Stack = createStackNavigator();

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