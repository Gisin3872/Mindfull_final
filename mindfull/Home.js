import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation();

  const navigateToJournal = () => {
    navigation.navigate('Journal Entry');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />
      <Text style={styles.blurb}>
        Welcome to Mindfull, a mental health app created for those looking to keep track of their mental health and chat with expert therapists.
      </Text>
      <TouchableOpacity style={styles.button} onPress={navigateToJournal}>
        <Text style={styles.buttonText}>Create Journal Entry</Text>
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
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
  },
  blurb: {
    color: '#E0E1DD',
    textAlign: 'center',
    margin: 30,
    marginTop: 0,
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
