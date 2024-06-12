import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '@expo/vector-icons/Ionicons';

import HomePage from './Home';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';
import JournalEntry from './JournalEntry';
import PastEntries from './PastEntries';
import EntryDetail from './EntryDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EntryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="View Past Entries"
      component={PastEntries}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EntryDetail" component={EntryDetail} />
  </Stack.Navigator>
);

function MyTabs() {
  return (
    <Tab.Navigator
  initialRouteName="Home"
  screenOptions={({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Journal Entry') {
        iconName = focused ? 'book' : 'book-outline';
      } else if (route.name === 'Send') {
        iconName = focused ? 'send' : 'send-outline';
      } else if (route.name === 'Receive') {
        iconName = focused ? 'mail' : 'mail-outline';
      } else if (route.name === 'Entries') {
        iconName = focused ? 'list' : 'list-outline';
      }

      return <Icon name={iconName} size={size - 2} color={color} />;
    },
    tabBarActiveTintColor: '#1B263B',
    tabBarInactiveTintColor: '#778DA9',
    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: 3 },
    tabBarStyle: [
      {
        display: 'flex',
        backgroundColor: '#E0E1DD'
      },
      null
    ]
  })}
>
  <Tab.Screen name="Home" component={HomePage} />
  <Tab.Screen name="Journal Entry" component={JournalEntry} />
  <Tab.Screen name="Send" component={SendMessage} />
  <Tab.Screen name="Receive" component={ReceiveMessage} />
  <Tab.Screen name="Entries" component={EntryStack} />
</Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
