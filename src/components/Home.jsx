import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { styles } from "../styles/Styles";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

function Home({ navigation }) {

  const [user, setUser] = useState({});
  // useEffect(async () => {
  //   try {
  //     const userString = await AsyncStorage.getItem("userToken");
  //     if (userString) {
  //       console.log(`user string es`, userString);
  //       //const userObject = JSON.parse(userString);
  //       //setUser(userObject);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return (
    <View>
      <Text>HOLA, {user.name}</Text>
    </View>
  );
}

export default Home;
