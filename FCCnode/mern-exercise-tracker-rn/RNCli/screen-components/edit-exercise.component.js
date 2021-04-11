import React, { useState } from 'react';
import styles from '../constants/style';

import {
  Text,
  View,
} from 'react-native';

const EditExercises = () => {

  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Exercises</Text>
    </View>
  );
};

export default EditExercises;