
import * as React from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
  View,
  useWindowDimensions,
} from 'react-native';

import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ExercisesList from './screen-components/exercises-list.component';
import EditExercises from './screen-components/edit-exercise.component';
import CreateUser from './screen-components/create-user.component';
import CreateExcercise from './screen-components/create-exercise.component';

import Colors from './constants/Colors';
import styles from './constants/style';

// Drawer Object for Drawer Screens
const Drawer = createDrawerNavigator();

// Drawer Navigator for Countries and World
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName= 'Excercises'
      // drawerStyle={styles.drawer}
      drawerType={useWindowDimensions().width >= 768 ? 'permanent' : 'front'}
      screenOptions={{
        activeTintColor: Colors.darker,
        inactiveTintColor: Colors.dark,
        headerTitle:'Excercise Tracker',
        // labelStyle: styles.drawerItem,
      }}
      >
      <Drawer.Screen
        name={'Excercises'}
        component={ExercisesList}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name={'earth'} size={20} color={color} />
        //   ),
        // }}
      />
      <Drawer.Screen
        name={'Create Excercises'}
        component={CreateExcercise}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name={'flag'} size={20} color={color} />
        //   ),
        // }}
      />
      <Drawer.Screen
        name={'Create User'}
        component={CreateUser}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name={'heart'} size={20} color={color} />
        //   ),
        // }}
      />
    </Drawer.Navigator>
  );
};


const App = () => {

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.light}
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </>
  );
};

export default App;
