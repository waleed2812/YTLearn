
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import Colors from './constants/Colors';
import styles from './constants/style';

const App = () => {

  return (
    <SafeAreaView>
      <StatusBar  />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
            <Text>Hello! World. </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
