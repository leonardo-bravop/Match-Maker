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
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import { FlatGrid } from "react-native-super-grid";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
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
    height: "25%",
  },
  lastTittle: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20,
    color: "white",
  },
  lastContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: "80%",
    height: "30%",
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "gray",
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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userLeagues = useSelector((state) => state.userLeagues);
  const leagues = useSelector((state) => state.leagues);

  const [search, setSearch] = useState("");
  const [meLeagues, setMeLeagues] = useState(false);
  const [results, setResults] = useState({});
  const [matches, setMatches] = useState([]);

  const [select, setSelect] = useState();
  const [selectMeLeagues, setSelectMeLeagues] = useState({ color: "#39424d" });

  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const updateSearch = (search) => {
    if (!search) setResults([]);
    setSearch(search);
    axios.get(`${uri}/api/league/findLeague/${search}`).then(({ data }) => {
      setResults(data);
    });
  };

  useEffect(async () => {
    try {
      // console.log(`Home Paso 1`);
      const userString = await AsyncStorage.getItem("userInfo");
      // console.log(`userString es`, userString);
      if (!userString) return;
      // console.log(`Home Paso 2`);
      const result = await dispatch(setUserMe(userString));
      // console.log(`Home Paso 3`);
      const userLeagues = await dispatch(
        setUserLeagues({ userId: result.payload._id })
      );
      // console.log(`Home Paso 4`);
      const { payload } = await dispatch(setLeagues(false));
      // console.log(`result es`, result);
      // console.log(`Home Paso 5`);
      const { data } = await axios.get(
        `${uri}/api/user/getMatches/${result.payload._id}`
      );
      // console.log("DATA ===> ", data);
      // console.log(`Home Paso 6`);
      setMatches(data);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  return (
    <View style={home.container}>
      <StatusBar style="light" />
      <View style={home.tittle}>
        <Text style={home.tittleText}>MATCH MAKER</Text>
      </View>
      <View style={home.containerDos}>
        <Text style={home.lastTittle}>Ultima partida</Text>
        {console.log("MATH ACA",matches)}
        {matches[0] ? (
          <TouchableOpacity
            style={home.lastContainer}
            onPress={() => {
              navigate("Historial");
            }}
          >
            <View style={home.lastItem}>
              <Text style={home.lastText}>
                {matches.reverse()[0].team_1[0].nickname}
              </Text>
            </View>
            <View style={home.lastItem}>
              <Text
                style={[
                  home.lastText,
                  { fontSize: 20, color: "black", fontWeight: "normal" },
                ]}
              >
                {matches[0].status}
              </Text>
            </View>
            <View style={home.lastItem}>
              <Text style={home.lastText}>
                {matches.reverse()[0].team_2[0].nickname}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: "white", fontSize: 16, alignSelf: "center" }}>
            Aun no tienes matches registradas
          </Text>
        )}
        <View style={{ marginTop: 10 }}>
          <SearchBar
            placeholder="Escribe aca..."
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            containerStyle={{
              backgroundColor: "#0e0b29",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            round={true}
            onClear={() => setResults([])}
            onCancel={() => setResults([])}
          />
        </View>
      </View>

      {results[0] ? (
        <>
          <View style={[home.ligaContainer, { marginTop: 20 }]}>
            <Text style={[home.ligaTittle, { width: "100%" }]}>RESULTADO</Text>
          </View>
          <Text style={{ color: "white", textAlign: "center" }}>
            ──────────────────────────────────────
          </Text>
          <FlatGrid
            style={home.gridView}
            itemDimension={120}
            data={results}
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
                <Text style={home.itemCode}>{item.sport}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <View style={[home.ligaContainer, { marginTop: 20 }]}>
            <Text
              style={[home.ligaTittle, select]}
              onPress={() => {
                setSelect({ color: "white" });
                setSelectMeLeagues({ color: "#39424d" });
                setMeLeagues(false);
              }}
            >
              LIGAS
            </Text>
            <Text
              style={[home.ligaTittle, selectMeLeagues]}
              onPress={() => {
                setSelectMeLeagues({ color: "white" });
                setSelect({ color: "#39424d" });
                setMeLeagues(true);
              }}
            >
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
              spacing={10}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setLeagueId(item._id));
                    dispatch(setLeague(item));
                    dispatch(setMembers(item._id));
                    navigate("Liga", item);
                  }}
                  style={[
                    home.itemContainer,
                    { backgroundColor: item.league.color },
                  ]}
                >
                  <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <Image
                      source={{
                        uri: item.league.img
                          ? item.league.img
                          : "https://trome.pe/resizer/G8-kkwwutkrNacKh5S6TJplAluU=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/OXHJSIF4SZDAJP6F5PHFZTLRYI.jpg",
                      }}
                      resizeMode="cover"
                      style={{ height: "100%" }}
                    />
                  </View>
                  <Text style={home.itemName}>{item.league.name}</Text>
                  <Text style={home.itemCode}>{item.league.sport}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatGrid
              style={home.gridView}
              itemDimension={120}
              data={leagues}
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
                  <Text style={home.itemCode}>{item.sport}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

export default Home;
