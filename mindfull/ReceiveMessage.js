import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

export default function ReceiveMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get('http://node.cci.drexel.edu:9378/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(() => {
        Alert.alert('Error', 'Could not fetch messages');
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.UserId === '1123' ? { ...styles.message, ...styles.fromUser} : {...styles.message, ...styles.fromOther}}>
            <Text style={styles.messageText}>{item.Content}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchMessages}>
          <Text style={styles.buttonText}>Receive Messages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D1B2A',
      justifyContent: 'flex-start',
    },
    buttonContainer: {
      alignItems: 'center',
      width: '100%',
    },
    message: {
      backgroundColor: '#1B263B',
      padding: 10,
      margin: 10,
      borderRadius: 20,
      width: '80%',
      flexGrow: 1,
    },
    messageText: {
      color: '#E0E1DD',
    },
    fromUser: {
      alignSelf: 'flex-end',
      backgroundColor: '#1B263B',
    },
    fromOther: {
      alignSelf: 'flex-start',
      backgroundColor: '#778DA9',
    },
    button: {
      backgroundColor: '#778DA9',
      padding: 10,
      borderRadius: 20,
      width: '50%',
      alignItems: 'center',
      marginBottom: 40,
    },
    buttonText: {
      color: '#0D1B2A',
    },
  });
