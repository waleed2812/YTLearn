import React, { useState } from 'react';
import styles from '../constants/style';

import {
  Text,
  View,
} from 'react-native';

const CreateExercise = () => {

  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Exercises</Text>
    </View>
  );
};

export default CreateExercise;