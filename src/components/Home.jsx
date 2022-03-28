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

import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {

  const [user, setUser] = useState({});
  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        console.log(`user string es`, userString);
        const userObject = JSON.parse(userString);
        setUser(userObject);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={home.container}>
      <View style={home.tittle}>
      <Text>HOLA</Text>
      </View>
    </View>
  );
}

export default Home;
