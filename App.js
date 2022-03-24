import { View, Text, SafeAreaView } from 'react-native'
import * as React from 'react';

import WelcomeNavigation from './src/navigations/WelcomeNavigation';


function App() {
  return (
    <SafeAreaView style={{flex : 1}}>
      <WelcomeNavigation/>
      
    </SafeAreaView>
  );
}

export default App;




/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
