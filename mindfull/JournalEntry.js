import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function JournalEntry({ refresh }) {
  const [feeling, setFeeling] = useState('');
  const [goodThing, setGoodThing] = useState('');
  const [badThing, setBadThing] = useState('');

  const submitEntry = () => {
    axios.post('http://node.cci.drexel.edu:9378/api/journals', {
      feeling: feeling,
      goodThing: goodThing,
      badThing: badThing
    })
    .then(response => {
      Alert.alert('Journal entry submitted', `Feeling: ${feeling}, Good thing: ${goodThing}, Bad thing: ${badThing}`);
      setFeeling('');
      setGoodThing('');
      setBadThing('');
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error', 'Could not submit journal entry');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setFeeling(text)}
        value={feeling}
        placeholder="How are you feeling today?"
        placeholderTextColor="#778DA9"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setGoodThing(text)}
        value={goodThing}
        placeholder="Write one good thing that happened today"
        placeholderTextColor="#778DA9"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setBadThing(text)}
        value={badThing}
        placeholder="Write one bad thing that happened today"
        placeholderTextColor="#778DA9"
      />
      <TouchableOpacity style={styles.button} onPress={submitEntry}>
        <Text style={styles.buttonText}>Submit Entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#1B263B',
    color: '#E0E1DD',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#778DA9',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0D1B2A',
  },
});
