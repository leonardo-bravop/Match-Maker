
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
/* const { manifest } = Constants; */
import { View, Text, SafeAreaView } from 'react-native'
import * as React from 'react';
import RootNavigation from "./src/navigation/rootNavigation";


function App() {
  return (
    <SafeAreaView style={{flex : 1, backgroundColor: "#0e0b29"}}>
      <RootNavigation/>
    </SafeAreaView>
  );
}

export default App;