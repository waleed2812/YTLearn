import React, { useState } from 'react';
import styles from '../constants/style';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'

import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditExercises = ({navigation, route}) => {

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState();
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
      axios.get('http://192.168.1.73:5000/exercises/'+ route.params.id)
        .then(response => {
          
          setUsername(response.data.username);
          setDescription(response.data.description);
          setDuration(response.data.duration);
          setDate(new Date(response.data.date));
          setFirst(false);
        })
        .catch(function (error) {
          console.error(error);
        })
    
    
      axios.get('http://192.168.1.73:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            setUsers(response.data.map(user => ({label: user.username, value: user.username})));
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }
  })

  // Change input to numbers
  const updateDuration = (...args) => {
    // Input field text
    let text = args[0] || '';

    // If user is trying to empty field
    if (text.length <= 0) {
      
      // Update Final Price
      setDuration('');

      return;
    }

    // Checking if the value is float
    // If it is a valid float update it
    // Other wise leave it
    if (!new RegExp(/^[-+]?\d*\.?\d*$/).test(text)) {
      return;
    }

    setDuration(text + '');
    
  };


  const onSubmit = () => {
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    axios.post('http://192.168.1.73:5000/exercises/update/' + route.params.id, exercise)
      .then(res => navigation.goBack())
      .catch(err => console.error(err));

  }

  return (
    <View style={styles.container}>
      {
        first ? <ActivityIndicator color='black' size='large' />:
      
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Username: </Text>
          <DropDownPicker
            items={users}
            defaultValue={username}
            containerStyle={{height: 40, width: '100%'}}
            style={{backgroundColor: '#fafafa', width: '100%'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setUsername(item.value)}
          />
          <Text style={styles.formLabel}>Description: </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setDescription(text)}
            value={description}
            placeholder="Update Description"
          />
          <Text style={styles.formLabel}>Duration: </Text>
          <TextInput
            style={styles.input}
            onChangeText={updateDuration}
            value={duration.toString()}
            placeholder="Update Duration"
            keyboardType='numeric'
          />
          <Text style={styles.formLabel}>Date: </Text>
          <DatePicker date={date} onDateChange={setDate} style={{marginLeft: 10, alignSelf: 'center'}} mode={'date'}/>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.button_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default EditExercises;