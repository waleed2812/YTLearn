import React, { useState } from 'react';
import styles from '../constants/style';

import {
  Text,
  View,
} from 'react-native';

const CreateUser = () => {

  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create User</Text>
    </View>
  );
};

export default CreateUser;