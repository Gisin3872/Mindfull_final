import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { List, Button } from 'react-native-paper';


const Item = ({ id, feeling, timestamp, goodThing, badThing, index }) => {
  const formattedTimestamp = moment(timestamp).format('MM-DD-YYYY');
  const backgroundColor = index % 2 === 0 ? '#415A77' : '#778DA9';

  return (
    <List.Accordion
      title={`Feeling: ${feeling}`}
      description={`Date: ${formattedTimestamp}`}
      style={{ backgroundColor: backgroundColor }}
      titleStyle={{ color: '#1B263B' }}
      descriptionStyle={{ color: '#1B263B' }}
    >
      <List.Item title={`Good Thing: ${goodThing}`} style={{ backgroundColor: '#778DA9' }} titleStyle={{ color: '#E0E1DD' }} />
      <List.Item title={`Bad Thing: ${badThing}`} style={{ backgroundColor: '#778DA9' }} titleStyle={{ color: '#E0E1DD' }} />
    </List.Accordion>
  );
};

const PastEntries = ({ navigation }) => {
  const [entries, setEntries] = useState([]);

  const refresh = () => {
    axios.get('http://node.cci.drexel.edu:9378/api/journals')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    refresh();
  }, []);

  const renderItem = ({ item, index }) => (
    <Item id={item.EntryId} feeling={item.Feeling} timestamp={item.Timestamp} goodThing={item.GoodThing} badThing={item.BadThing} index={index} />
  );

  return (
    <View style={styles.container}>
      <Button onPress={refresh} >Refresh</Button>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.EntryId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  item: {
    borderBottomColor: '#778DA9',
    borderBottomWidth: 1,
    padding: 10
  },
  title: {
    color: '#1B263B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#1B263B',
    fontSize: 14
  }
});

export default PastEntries;
