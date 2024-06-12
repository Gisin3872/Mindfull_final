import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';


const EntryDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    console.log(id);
    axios.get(`http://node.cci.drexel.edu:9378/api/journals/${id}`)
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {entry ? (
        <>
          <Text style={{ fontSize: 18, color: 'gray' }}>Feeling: {entry.Feeling}</Text>
          <Text style={{ fontSize: 18, color: 'gray' }}>Timestamp: {entry.Timestamp}</Text>
          <Text style={{ fontSize: 16 }}>Good Thing: {entry.GoodThing}</Text>
          <Text style={{ fontSize: 16 }}>Bad Thing: {entry.BadThing}</Text>
          <Button title="Close" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );  
};

export default EntryDetail;
