import React, { useState } from 'react';
import styles from '../constants/style';

import {
  Text,
  View,
} from 'react-native';

const ExercisesList = () => {

  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exercises List</Text>
    </View>
  );
};

export default ExercisesList;