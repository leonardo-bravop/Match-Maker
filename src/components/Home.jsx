import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { styles } from "../styles/Styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

function Home({ navigation }) {
  const [user, setUser] = useState({});
  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        const result = await axios.post(
          `${uri}/api/user/me`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${userString}`,
            },
          }
        );
        setUser(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View>
      <Text>HOLA, {user.name}</Text>
    </View>
  );
}

export default Home;
