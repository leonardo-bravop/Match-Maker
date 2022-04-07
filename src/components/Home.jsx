import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
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
import { setMembers } from "../state/memberList";
import { setLeagueId } from "../state/idLeague";

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
  ligaContainer: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
  },
  ligaTittle: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    textAlign: "center",
    width: "50%",
  },
  gridView: {
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

  const [search, setSearch] = useState("");
  const [meLeagues, setMeLeagues] = useState(false);
  const [results, setResults] = useState({});

  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const updateSearch = (search) => {
    setSearch(search);
    axios.get(`${uri}/api/league/findLeague/${search}`).then(({ data }) => {
      setResults(data);
      console.log(results);
    });
  };

  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        const result = await dispatch(setUserMe(userString));
        const userLeagues = await dispatch(
          setUserLeagues({ userId: result.payload._id })
        );
      }
      const { payload } = await dispatch(setLeagues(false));
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
      </View>

      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          onClear={() => setResults({})}
        />
      </View>
      {results[0] ? (
        <View>
          <Text style={home.ligaTittle}>
            RESULTADO
          </Text>
        </View>
      )
        : null
    }
      <View style={home.ligaContainer}>
        <Text style={home.ligaTittle} onPress={() => setMeLeagues(false)}>
          LIGAS
        </Text>
        <Text style={home.ligaTittle} onPress={() => setMeLeagues(true)}>
          TUS LIGAS
        </Text>
      </View>
      <Text style={{ color: "white", textAlign: "center" }}>
        ──────────────────────────────────────
      </Text>
      {meLeagues ? (
        <FlatGrid
          style={home.gridView}
          itemDimension={120}
          data={userLeagues}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setLeagueId(item._id));
                dispatch(setLeague(item));
                dispatch(setMembers(item._id));
                navigate("Liga", item);
              }}
              style={[home.itemContainer, { backgroundColor: item.color }]}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Image
                  source={{
                    uri: item.img
                      ? item.img
                      : "https://trome.pe/resizer/G8-kkwwutkrNacKh5S6TJplAluU=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/OXHJSIF4SZDAJP6F5PHFZTLRYI.jpg",
                  }}
                  resizeMode="cover"
                  style={{ height: "100%" }}
                />
              </View>
              <Text style={home.itemName}>{item.name}</Text>
              <Text style={home.itemCode}>{item.color}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatGrid
          style={home.gridView}
          itemDimension={120}
          data={leagues}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setLeagueId(item._id));
                dispatch(setLeague(item));
                dispatch(setMembers(item._id));
                navigate("Liga", item);
              }}
              style={[home.itemContainer, { backgroundColor: item.color }]}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Image
                  source={{
                    uri: item.img
                      ? item.img
                      : "https://trome.pe/resizer/G8-kkwwutkrNacKh5S6TJplAluU=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/OXHJSIF4SZDAJP6F5PHFZTLRYI.jpg",
                  }}
                  resizeMode="cover"
                  style={{ height: "100%" }}
                />
              </View>
              <Text style={home.itemName}>{item.name}</Text>
              <Text style={home.itemCode}>{item.color}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default Home;
