import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";

const screen = Dimensions.get("screen");

const home = StyleSheet.create({
  container: {
    /*     height:50*screen.height, width:50*screen.width, */
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
    flex:1,
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
    marginLeft: 20
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

function Home({ navigation }) {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);

  const [user, setUser] = useState({});
  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        /* console.log(`user string es`, userString); */
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
        <Text style={home.tittleText}>MATCH MAKER</Text>
      </View>
      <View style={home.containerDos}>
        <Text style={home.lastTittle}>Ultima partida</Text>
        <View style={home.lastContainer}>
          <View style={home.lastItem}>
            <Text style={home.lastText}>TENGO 10 CAR</Text>
          </View>
          <View style={home.lastItem}>
            <Text style={[home.lastText,{fontSize: 30, color: "#3498db", fontWeight: "normal",}]}>21-3</Text>
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
        data={items}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[home.itemContainer, { backgroundColor: item.code }]}>
            <Text style={home.itemName}>{item.name}</Text>
            <Text style={home.itemCode}>{item.code}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Home;
