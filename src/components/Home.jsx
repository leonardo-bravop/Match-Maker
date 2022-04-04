import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from "react-native-super-grid";
import axios from "axios";
import Constants from "expo-constants";

import { leagueStyles } from "../styles/league";
import { profile } from "../styles/profile";
import { useDispatch, useSelector } from "react-redux";
import { setUserMe } from "../state/user";
import { setUserLeagues } from "../state/userLeague";
import { setLeagues } from "../state/league";
import { setLeague } from "../state/selectLeague";

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
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 40,
    color: "white",
    textAlign: "center",
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

function Home({ navigation: { navigate } }) {
  const { manifest } = Constants;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userLeagues = useSelector((state) => state.userLeagues);
  const leagues = useSelector((state) => state.leagues);

  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        const result = await dispatch(setUserMe(userString));
        const userLeagues = await dispatch(
          setUserLeagues({ userId: result.payload._id })
        );
      }
      const { payload } = await dispatch(setLeagues());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <View style={home.container}>
      <View style={home.tittle}>
        <Text style={home.tittleText}>MATCH MAKER</Text>
      </View>
      <View style={home.containerDos}>
        <Text style={home.lastTittle}>Ultima partida</Text>

        <TouchableOpacity
          style={home.lastContainer}
          onPress={() => {
            navigate("Historial");
          }}
        >
          <View style={home.lastItem}>
            <Text style={home.lastText}>{user.nickname}</Text>
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
            <Text style={home.lastText}>Taserface</Text>
          </View>
        </TouchableOpacity>
        <Text style={home.ligaTittle}>──────── LIGAS ────────</Text>
      </View>

      <FlatGrid
        style={home.gridView}
        itemDimension={110}
        data={leagues}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setLeague(item))
              navigate("Liga", item)}}
            style={[home.itemContainer, { backgroundColor: item.color }]}
          >
            <Text style={home.itemName}>{item.name}</Text>
            <Text style={home.itemCode}>{item.color}</Text>
            <View style={[leagueStyles.img, { backgroundColor: item.code }]}>
              <Image
                style={[profile.cardImage, { width: "150%" }]}
                source={{ uri: item.img }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Home;
