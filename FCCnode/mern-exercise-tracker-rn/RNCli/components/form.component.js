import styles from '../constants/style';
import Colors from '../constants/Colors';

import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'

import {
    ActivityIndicator,
    Text,
    TextInput,
    View,
  } from 'react-native';

  import { TouchableOpacity } from 'react-native-gesture-handler';

const Form = props => {
    return(
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
    );
}

export default Form;