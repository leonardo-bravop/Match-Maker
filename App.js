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



