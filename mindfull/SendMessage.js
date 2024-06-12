import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

function SendMessage() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    axios.post('http://node.cci.drexel.edu:9378/api/messages', {
        content: message,
        UserId: '1123',
      })
      .then(() => {
        return axios.post('http://node.cci.drexel.edu:9378/api/messages', {
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          UserId: '3820',
        });
      })
      .then(() => {
        Alert.alert('Success', 'Messages sent');
        setMessage('');
      })
      .catch(() => {
        Alert.alert('Error', 'Could not send messages');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message here"
        placeholderTextColor="#778DA9"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send Message</Text>
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

export default SendMessage;