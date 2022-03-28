import React from "react";
import { View, Text , Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("screen");

const home = StyleSheet.create({
  container: {
    backgroundColor: '#0e0b29',
    height:50*screen.height, width:50*screen.width
  },
  tittle: {
    marginTop: 40,
  }
})

function Home({ navigation }) {
  return (
    <View style={home.container}>
      <View style={home.tittle}>
      <Text>HOLA</Text>
      </View>
    </View>
  );
}

export default Home;
