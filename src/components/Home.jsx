import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";
import axios from "axios";
import Constants from "expo-constants";
const screen = Dimensions.get("screen");

const home = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  tittle: {
    marginTop: 70,
    alignItems: "center",
  },
  tittleText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  containerDos: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  lastTittle: {
    fontStyle: "italic",
    fontSize: 20,
    color: "white",
  },
  lastContainer: {
    flexDirection: "row",
    width: "80%",
    height: "30%",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#57de21",
    paddingLeft: 5,
  },
  lastItem: {
    width: "33%",
  },
  lastText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#34495e",
  },
  ligaTittle: {
    alignSelf: "flex-start",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 40,
    color: "white",
    marginLeft: 20,
  },
  gridView: {
    marginTop: -90,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "900",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});

function Home({ navigation : {navigate} }) {
  const { manifest } = Constants;

  const [league, setLeague] = React.useState([]);
  const [user, setUser] = useState({});

  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        const result = await axios.post(
          `${uri}/api/user/me`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userString}`,
            },
          }
        );
        setUser(result.data);
      }
      const { data } = await axios.get(`${uri}/api/league/getAll`);
      setLeague(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={home.container}>
      <View style={home.tittle}>
        <Text style={home.tittleText}>MATCH MAKER</Text>
      </View>
      <View style={home.containerDos}>
        <Text style={home.lastTittle}>Ultima partida</Text>
        <View style={home.lastContainer}>
          <View style={home.lastItem}>
            <Text style={home.lastText}>TENGO 10 CAR</Text>
          </View>
          <View style={home.lastItem}>
            <Text
              style={[
                home.lastText,
                { fontSize: 30, color: "#3498db", fontWeight: "normal" },
              ]}
            >
              21-3
            </Text>
          </View>
          <View style={home.lastItem}>
            <Text style={home.lastText}>TENGO 10 CAR</Text>
          </View>
        </View>
        <Text style={home.ligaTittle}>LIGAS</Text>
      </View>

      <FlatGrid
        style={home.gridView}
        itemDimension={110}
        data={league}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[home.itemContainer, { backgroundColor: item.color }]}
            onPress={() => navigate("Ligas", item)}
          >
            <Text style={home.itemName}>{item.name}</Text>
            <Text style={home.itemCode}>{item.color}</Text>
          </TouchableOpacity>
      )}
      />
    </View>
  );
}

export default Home;
